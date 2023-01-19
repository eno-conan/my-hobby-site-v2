import { rest } from "msw";

export interface IJsonPlaceholderData {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const JSON_PLACEHOLDER: Array<IJsonPlaceholderData> = [
  {
    id: 1,
    userId: 1,
    title: "MSW Mock Data",
    completed: false,
  },
];

const hello = { name: "Hello World" };

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (_, res, ctx) => {
    return res(ctx.json(JSON_PLACEHOLDER));
  }),
  rest.get("/api/hello", (_, res, ctx) => {
    return res(ctx.json(hello));
  }),
];


