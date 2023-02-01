import { GetServerSideProps, NextPage } from "next";
import axios from "redaxios";
import Meta from "src/components/Meta";
import styles from "../../styles/pages/sample/msw.module.css";
import { IJsonPlaceholderData } from "src/mocks/handlers";

// Cssの学習関連を表示
function CssFlex() {
  return (
    <>
      <div className="py-4 text-3xl">Flex Grow</div>
      <div className={styles.flexContainer}>
        <div className={`${styles.flex1} ${styles.grow1}`}>flex grow 1</div>
        <div className={`${styles.flex1} ${styles.grow2}`}>flex grow 2</div>
      </div>
      <div className="py-4 text-3xl">Flex Shrink</div>
      <div className={styles.flexContainer}>
        <div className={`${styles.flex2} ${styles.shrink1}`}>flex Shrink 1</div>
        <div className={`${styles.flex2} ${styles.shrink2}`}>flex Shrink 2</div>
      </div>
    </>
  );
}

// MSWをもちいたデータ取得
function DataUsingMSW(jsonPlaceholders: IJsonPlaceholderData[]) {
  // {jsonPlaceholders: Array(1)}
  return (
    <>
      {/* {jsonPlaceholders &&
        data.map((d: any, idx: number) => {
          return <div key={idx}>{idx % 50 == 0 ? <>{d.title}</> : <></>}</div>;
        })} */}
    </>
  );
}

const MswIndex: NextPage = (props: any) => {
  // const jsonPlaceholders: IJsonPlaceholderData[] = props.data

  return (
    <>
      <div className={"container px-4"}>
        <Meta title="msw" description="check msw work" />
        {props.data?.map((d: any, idx: number) => {
          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          return <div key={idx}>{idx % 50 === 0 ? <>{d.title}</> : <></>}</div>;
        })}
        {/* <DataUsingMSW jsonPlaceholders={jsonPlaceholders} /> */}
        <CssFlex />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
};

export default MswIndex;
