import "../styles/globals.css";
import type { AppProps } from "next/app";
import useTransition from "src/hooks/useTransition";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NextPageWithLayout } from "./page";
import { ThemeProvider } from "next-themes";

// MSWの起動設定
if (process.env.NEXT_PUBLIC_API_MOCKING == "enabled") {
  require("../mocks");
}

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

// tanStack Query定義
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  // 画面のローディング機能
  useTransition();
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
