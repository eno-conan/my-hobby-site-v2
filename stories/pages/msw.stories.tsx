// YourPage.stories.js|jsx|ts|tsx

import React from "react";

import { rest } from "msw";
import MswPage from "../../src/pages/sample/msw";
import { ComponentStory } from "@storybook/react";

export default {
  // /* 👇 The title prop is optional.
  // * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  // * to learn how to generate automatic titles
  // */
  // title: 'MswPage',
  // component: MswPage,
};

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
      "https://jsonplaceholder.typicode.com/todos/",
      (_req, res, ctx) => {
        return res(ctx.json(TestData));
      }
    ),
  ],
};
