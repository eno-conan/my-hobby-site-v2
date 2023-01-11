import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import axios from 'axios'

const MswIndex: NextPage = (props: any) => {
  return (
    <>
      {props.data &&
        props.data.map((d: any, idx: number) => {
          return <div key={idx}>{idx % 50 == 0 ? <>{d.title}</> : <></>}</div>;
        })}
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
