import Link from 'next/link';

import { InstrumentType, StockPrice } from '@/types';
import { setPriceAction, StockEmpty } from '@/entities/stock';
import { useStocksStore } from '@/entities/stock/model/useStocksStore';
import StockCard from '@/entities/stock/ui/StockCard';
import StockChartCard from '@/entities/stock/ui/StockChartCard';

import { useSSE } from '@/shared/lib/SSE';

import styles from './StockPage.module.scss';

const toType = <T,>(value: string): T => JSON.parse(value);

const MapInstrumentTypeToMany: Record<InstrumentType, string> = {
    share: 'stocks',
    etf: 'etfs',
    currency: 'currencies',
    futures: 'futures',
    bond: 'bonds',
};

export const StockPage = () => {
    const { stocks, prices } = useStocksStore();
    const figies = stocks.map(({ figi }) => figi).join(',');

    useSSE(`http://localhost:3000/api/v1/stream/market?figies=${figies}`, {
        onData: ({ data }) => setPriceAction(toType<StockPrice>(data)),
    });

    return (
        <div className={styles.root}>
            <div className={styles.stocks}>
                {stocks.map((stock) => (
                    <Link
                        href={`https://www.tinkoff.ru/invest/${
                            MapInstrumentTypeToMany[stock.instrumentType]
                        }/${stock.ticker}/`}
                        target="_blank"
                        key={stock.instrumentId}
                    >
                        <StockCard
                            {...stock}
                            price={{
                                ...stock.price,
                                amount:
                                    prices[stock.figi].at(-1)?.close ??
                                    stock.price.amount,
                            }}
                            after={
                                prices[stock.figi]?.length > 0 ? (
                                    <StockChartCard
                                        dataChart={prices[stock.figi]}
                                    />
                                ) : (
                                    <StockEmpty />
                                )
                            }
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};
