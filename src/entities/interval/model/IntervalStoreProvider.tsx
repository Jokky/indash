'use client';

import {
    IntervalState,
    intervalStore,
} from '@/entities/interval/model/interval';
import { CreateStoreProvider } from '@/shared/zustand';

export const [IntervalStoreContext, IntervalStoreProvider] =
    CreateStoreProvider<IntervalState>(intervalStore);

export default IntervalStoreProvider;
