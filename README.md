## リンク集

### create-next-app
- [23/01/10：アプリ作成方法](https://mo-gu-mo-gu.com/create-next-app-typescript/)
- [23/01/11：アプリ作成方法(ESlintの設定も含めて)](https://qiita.com/mu-suke08/items/28fefe92b113c8f1c25d)
- [23/01/11：ESlintの設定](https://qiita.com/sochan-dev/items/525539b5dc7e4d7f814b)


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
  - `next.config.js`に環境変数追加
    ```
        env: {
        // NEXT_PUBLIC_API_MOCKING: "disabled",
        NEXT_PUBLIC_API_MOCKING: "enabled",
        },
     ```
