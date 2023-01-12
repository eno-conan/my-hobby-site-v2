## リンク集

### create-next-app
- [23/01/10：アプリ作成方法](https://mo-gu-mo-gu.com/create-next-app-typescript/)
- [23/01/11：アプリ作成方法(ESlintの設定も含めて)](https://qiita.com/mu-suke08/items/28fefe92b113c8f1c25d)
- [23/01/11：ESlintの設定](https://qiita.com/sochan-dev/items/525539b5dc7e4d7f814b)
  - Vercelにデプロイしたら、以下エラーが発生したので、`react/no-unescaped-entities`を1(warning)に設定
  ```
  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
  ```
- 
### Eslint
- [23/01/11：no-consoleの設定](https://eslint.org/docs/latest/rules/no-console?s=09)
- [23/01/12：disabling rules](https://nextjs.org/docs/basic-features/eslint#disabling-rules)

### env variables
- [23/01/11：envファイルの定義](https://fwywd.com/tech/next-env)

### StoryBook
- [23/01/10：インストール、初期設定](https://reffect.co.jp/react/next-js-12-storybook)
- [23/01/11：getServerSidePropsとの連携方法](https://egghead.io/lessons/next-js-mock-getserversideprops-and-getstaticprops-request-with-msw-and-storybook-loaders)

### Msw導入
- [23/01/10：インストール、初期設定](https://zenn.dev/higuchimakoto/articles/d9865193910046)
  - mswインストール
    - `npm install msw --save-dev`
  - Workderの生成
    - `npx msw init public/ --save`
  - mocksフォルダを作成（記事の中にはない）し、サーバおよびDummyデータの設定
  - `jest.setup.js`にMockサーバ定義
  - `pages/_app.tsx`にMockを読み込みするか、条件分岐を設定
  - envファイルの作成し、以下を設定
    - `.env.local`
      - NEXT_PUBLIC_API_MOCKING=enabled
    - `.env.production`
      - NEXT_PUBLIC_API_MOCKING=disabled

### Vitest
- [23/01/11：インストール、初期設定](https://zenn.dev/elpnt/scraps/5051d7e06bdd6a)
- 
### tailwind css
- [23/01/12：インストール、初期設定](https://tailwindcss.com/docs/guides/nextjs)

### radix
- [23/01/12：インストール、初期設定](https://www.radix-ui.com/docs/primitives/overview/getting-started)
- 23/01/12：@import '@radix-ui/colors/violet.css';の実装箇所
  - `XXX.module.css`に記載すると、以下エラーが表示されてしまう
  ```
  Syntax error: Selector ":root" is not pure (pure selectors must contain at least one local class or id)
  ```
  - 解決方法
    - **globals.cssに記述すればいい**

### playwright
- [23/01/11：インストール、初期設定](https://playwright.dev/docs/intro)
- [23/01/11：基本操作関連の実装](https://zenn.dev/optimisuke/articles/f38ea76006d3a6)

### Cypress
- playwrightの方が実装しやすいかも
  - [23/01/11：インストール、初期設定](https://zenn.dev/tsucchiiinoko/articles/cbf3189eb62127)
  - 以下エラーの適切な解決方法は？
     ```
      Type error: 'commands.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
    ```
