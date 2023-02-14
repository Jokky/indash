import { intervalStore } from '@/entities/interval/model/interval';
import { IntervalStoreContext } from '@/entities/interval/model/IntervalStoreProvider';
import { useCreateStore } from '@/shared/zustand';

export const useIntervalStore = () =>
    useCreateStore(intervalStore, IntervalStoreContext);
