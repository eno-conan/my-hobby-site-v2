import "../styles/globals.css";
import type { AppProps } from "next/app";
import useTransition from "src/hooks/useTransition";

if (process.env.NEXT_PUBLIC_API_MOCKING == "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  // 画面のローディング機能
  useTransition();
  return <Component {...pageProps} />;
}

export default MyApp;
