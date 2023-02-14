import { Stock } from '@/types';
import { fetcher } from '@/shared/api/fetcher';

export const getStocks = () =>
    fetcher<unknown, Stock[]>('/api/v1/stocks').then(({ data }) => data);
