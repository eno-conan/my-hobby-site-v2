import "../styles/globals.css";
import type { AppProps } from "next/app";
import useTransition from "src/hooks/useTransition";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
if (process.env.NEXT_PUBLIC_API_MOCKING == "enabled") {
  require("../mocks");
}

// tanStack Queryのための定義
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  // 画面のローディング機能
  useTransition();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
