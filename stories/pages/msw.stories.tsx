// YourPage.stories.js|jsx|ts|tsx

import React from "react";

import { rest } from "msw";
import MswPage, { getServerSideProps } from "../../src/pages/sample/msw";
import { ComponentStory } from "@storybook/react";

export default {};

//👇The mocked data that will be used in the story
const TestData = [
  {
    id: 1,
    userId: 1,
    title: "Something",
    completed: false,
  },
];

const PageTemplate: ComponentStory<typeof MswPage> = () => <MswPage />;

export const MockedSuccess = PageTemplate.bind({});
MockedSuccess.parameters = {
  msw: [
    rest.get(
      "https://jsonplaceholder.typicode.com/todos",
      (_req, res, ctx) => {
        return res(ctx.json(TestData));
      }
    ),
  ],
};
