import { StockChart } from '@/types';
import { fetcher } from '@/shared/api/fetcher';

interface GetPricesParams {
    figies: string[];
    interval: string;
}

export const getPrices = ({ figies, interval }: GetPricesParams) => {
    const params = new URLSearchParams({
        figies: figies.join(','),
        interval,
    });

    return fetcher<unknown, Record<string, StockChart[]>>(
        `/api/v1/prices?${params.toString()}`,
    ).then(({ data }) => data);
};
