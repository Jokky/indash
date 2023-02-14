'use client';

import { StocksState, stocksStore } from '@/entities/stock';
import { CreateStoreProvider } from '@/shared/zustand';

const [StocksStoreContext, StocksStoreProvider] =
    CreateStoreProvider<StocksState>(stocksStore);

export { StocksStoreContext };

export default StocksStoreProvider;
