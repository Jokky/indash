import { createTinkoffApi } from '@/shared/createTinkoffApi';
import { quotationToNumber } from '@/shared/lib';
import { withAuth } from '@/shared/withAuth';

export default withAuth(async (request, response, context) => {
    const tinkoffInvestApi = createTinkoffApi(context.token);

    const figies = (request.query.figies as string).split(',');

    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache, no-transform');
    response.setHeader('Connection', 'keep-alive');

    await tinkoffInvestApi.stream.market
        .lastPrice(
            { instruments: figies.map((figi) => ({ figi })) },
            ({ time, price, figi }) => {
                const stockPrice = {
                    figi,
                    time: time?.getTime(),
                    price: quotationToNumber(price),
                };

                response.write(`data: ${JSON.stringify(stockPrice)}\n`);
                response.write('\n');
            },
        )
        .catch(() => {
            tinkoffInvestApi.stream.market.cancel();
            response.end();
        });

    // Каждую минут прерываем соединение, чтобы избавиться от проблемы с большим количеством запросов
    setTimeout(() => {
        tinkoffInvestApi.stream.market.cancel();
        response.end();
    }, 60_000);
});
