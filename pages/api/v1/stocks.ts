import { InstrumentIdType } from 'tinkoff-invest-api/cjs/generated/instruments';
import { Quotation } from 'tinkoff-invest-api/src/generated/common';
import { Stock } from '@/types';
import { createTinkoffApi } from '@/shared/createTinkoffApi';
import { quotationToNumber } from '@/shared/lib';
import { withAuth } from '@/shared/withAuth';

const mapCurrency: Record<string, string> = {
    usd: '$',
    eur: '€',
    rub: '₽',
};

const getSymbolCurrency = (value: string): string => {
    const symbol = mapCurrency[value];

    if (!symbol) {
        return value;
    }

    return symbol;
};

const isValue = <T>(item?: T): item is T => Boolean(item);

export default withAuth(async (request, response, context) => {
    const tinkoffInvestApi = createTinkoffApi(context.token);

    try {
        const favoritesResponse =
            await tinkoffInvestApi.instruments.getFavorites({});

        const shareResponses = await Promise.all(
            favoritesResponse.favoriteInstruments.map(({ ticker, classCode }) =>
                tinkoffInvestApi.instruments
                    .getInstrumentBy({
                        id: ticker,
                        idType: InstrumentIdType.INSTRUMENT_ID_TYPE_TICKER,
                        classCode,
                    })
                    .then(({ instrument }) => {
                        return instrument;
                    }),
            ),
        );

        // Получаем последние цены по figi акций
        const lastPricesResponse =
            await tinkoffInvestApi.marketdata.getLastPrices({
                figi: favoritesResponse.favoriteInstruments.map(
                    ({ figi }) => figi,
                ),
            });

        // Формируем объект с ценами, чтобы быстрее происходил поиск
        const mapPrices = lastPricesResponse.lastPrices.reduce<
            Record<string, Quotation | undefined>
        >((prev, { figi, price }) => ({ ...prev, [figi]: price }), {});

        const stocks: Stock[] = shareResponses.filter(isValue).map(
            ({ uid, ticker, isin, figi, name, currency, instrumentType }) =>
                ({
                    instrumentId: uid,
                    name,
                    ticker,
                    figi,
                    icon: `https://invest-brands.cdn-tinkoff.ru/${isin}x160.png`,
                    price: {
                        currency: getSymbolCurrency(currency),
                        amount: quotationToNumber(mapPrices[figi]),
                    },
                    instrumentType,
                    properties: [],
                } as Stock),
        );

        response.status(200).json(stocks);
    } catch {
        await tinkoffInvestApi.stream.market.cancel();
        response.status(501).end();
    }
});
