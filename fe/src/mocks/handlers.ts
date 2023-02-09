import { rest } from 'msw';

export const handlers = [
  rest.get('/test', (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({
        test: '테스트지롱~',
      }),
    );
  }),
];
