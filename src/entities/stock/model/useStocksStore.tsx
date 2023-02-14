import { stocksStore } from '@/entities/stock';
import { StocksStoreContext } from '@/entities/stock/model/StocksStoreProvider';
import { useCreateStore } from '@/shared/zustand';

export const useStocksStore = () =>
    useCreateStore(stocksStore, StocksStoreContext);
