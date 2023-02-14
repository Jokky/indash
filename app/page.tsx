import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/widget';
import StockPage from '@/pages/stock';
import { AUTH_TOKEN_PARAM, authStore } from '@/features/auth/by-token';
import { AuthStoreProvider } from '@/features/auth/by-token/model/auth/AuthStoreContext';
import { getInterval } from '@/entities/interval/api/getInterval';
import { getIntervalUpdate } from '@/entities/interval/api/getIntervalUpdate';
import IntervalStoreProvider from '@/entities/interval/model/IntervalStoreProvider';
import { fetchContext, stocksStore } from '@/entities/stock';
import StocksStoreProvider from '@/entities/stock/model/StocksStoreProvider';
import { ComponentCompose } from '@/shared/lib';
import { AppLayout } from '@/shared/ui';

export default async function Home() {
    const token = cookies().get(AUTH_TOKEN_PARAM);

    if (!token) {
        redirect('/login');
    }
    authStore.setState({ token: token.value });

    const interval = await getInterval();
    const intervalUpdate = await getIntervalUpdate();

    await fetchContext({ interval });

    const stocksState = stocksStore.getState();
    const authState = authStore.getState();

    return (
        <ComponentCompose
            components={[
                [
                    IntervalStoreProvider,
                    { state: { interval, intervalUpdate } },
                ],
                [StocksStoreProvider, { state: stocksState }],
                [AuthStoreProvider, { state: authState }],
            ]}
        >
            <AppLayout header={<Header />} body={<StockPage />} />
        </ComponentCompose>
    );
}
