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

  rest.post('/projectInfo', async (req, res, ctx) => {
    const data = JSON.parse(await req.text());

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        name: `${data.projectId}의 프로젝트 이름`,
        image: 'https://picsum.photos/100/100',
      }),
    );
  }),
];
