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

  rest.post('/projectBlockInfo', async (req, res, ctx) => {
    const data = JSON.parse(await req.text());

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json([
        {
          title: 'test1111',
          manager: 'mingyu',
          progress: 0,
          importance: 4,
          bgColor: 2,
          start: '2022-03-15',
          end: '2023-03-25',
          col: 0,
          subTitle: ['sub1', 'sub2'],
          blockId: 1,
        },
        {
          title: 'test2222',
          manager: 'mingyu',
          progress: 3,
          importance: 2,
          bgColor: 4,
          start: '2023-03-16',
          end: '2023-03-23',
          col: 1,
          subTitle: ['sub1', 'sub2'],
          blockId: 2,
        },
        {
          title: 'test2232',
          manager: 'mingyu',
          progress: 3,
          importance: 2,
          bgColor: 9,
          start: '2023-03-16',
          end: '2023-03-27',
          col: 2,
          subTitle: ['sub1', 'sub2'],
          blockId: 3,
        },
      ]),
    );
  }),
];
