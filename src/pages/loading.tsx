import React from "react";
import MainLayout from "src/components/layout";
import styles from "../styles/pages/loading.module.css";
import { NextPageWithLayout } from "./page";

const Loading: NextPageWithLayout = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={styles.Label}>Loading...</div>
      <div className={"flex justify-center"}>
        <div
          className={
            "animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"
          }
        />
      </div>
    </>
  );
};

export default Loading;
Loading.getLayout = (page) => <MainLayout>{page}</MainLayout>;
