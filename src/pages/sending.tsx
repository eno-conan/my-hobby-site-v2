import MainLayout from "src/components/layout";
import styles from "../styles/pages/loading.module.css";
import { NextPageWithLayout } from "./page";

const Sending: NextPageWithLayout = () => {
  return (
    <>
      <div className={styles.Label}>Sending...</div>
      <div className={"flex justify-center"}>
        <div className={"animate-ping h-2 w-2 bg-purple-700 rounded-full"} />
        <div className={"animate-ping h-2 w-2 bg-purple-700 rounded-full mx-4"} />
        <div className={"animate-ping h-2 w-2 bg-purple-700 rounded-full"} />
      </div>
    </>
  );
};

export default Sending;
Sending.getLayout = (page) => <MainLayout>{page}</MainLayout>;
