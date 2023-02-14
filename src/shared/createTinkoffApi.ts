import { TinkoffInvestApi } from 'tinkoff-invest-api';

export const createTinkoffApi = (token: string) =>
    new TinkoffInvestApi({
        token,
    });
