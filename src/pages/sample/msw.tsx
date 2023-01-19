import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Meta from "src/components/Meta";
import styles from "../../styles/pages/sample/msw.module.css";

const MswIndex: NextPage = (props: any) => {
  return (
    <>
      <div className={'container px-4'}>
        <Meta title="msw" description="check msw work" />
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
        {props.data &&
          props.data.map((d: any, idx: number) => {
            return <div key={idx}>{idx % 50 == 0 ? <>{d.title}</> : <></>}</div>;
          })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  const data = res.data
  return {
    props: {
      data: data,
    },
  };
};

export default MswIndex;
