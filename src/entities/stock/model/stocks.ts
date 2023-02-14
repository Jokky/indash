import { createStore } from 'zustand';
import { Stock, StockChart, StockPrice } from '@/types';
import { getPrices, getStocks } from '@/shared/api';

export interface StocksState {
    stocks: Stock[];
    prices: Record<string, StockChart[]>;
}

export const initialStoreState: StocksState = {
    stocks: [],
    prices: {},
};

export const stocksStore = createStore<StocksState>(() => ({
    ...initialStoreState,
}));

interface FetchContextParams {
    interval: string;
}

export const fetchContext = async (params: FetchContextParams) => {
    await fetchStocks();
    await fetchPrices(params);
};

export const fetchStocks = async () => {
    const stocks = await getStocks();
    stocksStore.setState(() => ({ stocks }));
};

interface FetchPricesParams {
    interval: string;
}
export const fetchPrices = async ({ interval }: FetchPricesParams) => {
    const figies = stocksStore.getState().stocks.map(({ figi }) => figi);
    const prices = await getPrices({ figies, interval });
    stocksStore.setState(() => ({ prices }));
};

export const setPriceAction = async ({ time, price, figi }: StockPrice) => {
    stocksStore.setState(({ prices }) => ({
        prices: {
            ...prices,
            [figi]: [...prices[figi], { time, close: price, open: null }],
        },
    }));
    // stocksStore.setState(({ stocks }) => {
    //     const updatedStocks = stocks.map((stock) => {
    //         if (stock.figi === figi) {
    //             stock.price.amount = price;
    //         }
    //         return stock;
    //     });
    //
    //     return {
    //         stocks: updatedStocks,
    //     };
    // });
};
