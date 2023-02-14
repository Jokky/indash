import { CandleInterval } from 'tinkoff-invest-api/cjs/generated/marketdata';
import { StockChart } from '@/types';
import { INTERVALS } from '@/entities/interval/model';
import { createTinkoffApi } from '@/shared/createTinkoffApi';
import { quotationToNumber } from '@/shared/lib';
import { withAuth } from '@/shared/withAuth';

const MapIntervals: Record<INTERVALS, CandleInterval> = {
    [INTERVALS.INTERVAL_1M]: CandleInterval.CANDLE_INTERVAL_1_MIN,
    [INTERVALS.INTERVAL_5M]: CandleInterval.CANDLE_INTERVAL_5_MIN,
    [INTERVALS.INTERVAL_15M]: CandleInterval.CANDLE_INTERVAL_15_MIN,
    [INTERVALS.INTERVAL_1H]: CandleInterval.CANDLE_INTERVAL_HOUR,
    [INTERVALS.INTERVAL_1D]: CandleInterval.CANDLE_INTERVAL_DAY,
};

const getFromTo = () => [new Date(), new Date()];

const MapFromToIntervals: Record<INTERVALS, () => [Date, Date]> = {
    [INTERVALS.INTERVAL_1M]: () => {
        const [from, to] = getFromTo();
        from.setHours(from.getHours() - 1);
        return [from, to];
    },
    [INTERVALS.INTERVAL_5M]: () => {
        const [from, to] = getFromTo();
        from.setHours(from.getHours() - 2);
        return [from, to];
    },
    [INTERVALS.INTERVAL_15M]: () => {
        const [from, to] = getFromTo();
        from.setHours(from.getHours() - 4);
        return [from, to];
    },
    [INTERVALS.INTERVAL_1H]: () => {
        const [from, to] = getFromTo();
        from.setDate(from.getDate() - 5);
        return [from, to];
    },
    [INTERVALS.INTERVAL_1D]: () => {
        const [from, to] = getFromTo();
        from.setMonth(from.getMonth() - 3);
        return [from, to];
    },
};

export default withAuth(async (request, response, context) => {
    const tinkoffInvestApi = createTinkoffApi(context.token);

    const figies = (request.query.figies as string).split(',');
    const interval =
        (request.query.interval as INTERVALS) || INTERVALS.INTERVAL_1H;

    const [from, to] = MapFromToIntervals[interval]();

    const candlesResponses = await Promise.all(
        figies.map((figi) =>
            tinkoffInvestApi.marketdata
                .getCandles({
                    figi,
                    interval: MapIntervals[interval],
                    from,
                    to,
                })
                .then(
                    ({ candles }) =>
                        [
                            figi,
                            candles.map(({ open, close, time }) => ({
                                time: time?.getTime() ?? null,
                                open: quotationToNumber(open),
                                close: quotationToNumber(close),
                            })),
                        ] as [string, StockChart[]],
                ),
        ),
    );

    const candlesFigi = Object.fromEntries(candlesResponses);
    response.status(200).json(candlesFigi);
});
