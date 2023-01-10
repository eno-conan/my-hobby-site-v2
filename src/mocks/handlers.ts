import { rest } from "msw";

interface IData {
  id: number,
  userId: number,
  title: string,
  completed: boolean
}

const TestData: Array<IData> = [
  {
    id: 1,
    userId: 1,
    title: 'Something',
    completed: false
  },
];

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (_, res, ctx) => {
    return res(
      ctx.json(TestData)
    );
  }),
];
