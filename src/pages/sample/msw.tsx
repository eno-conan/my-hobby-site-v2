import { GetServerSideProps, NextPage } from "next";
import React from "react";
import axios from 'axios'
import Meta from "src/components/Meta";
import styles from "../../styles/pages/sample/msw.module.css";
import { Checkbox, Table } from 'flowbite-react';

const MswIndex: NextPage = (props: any) => {
  return (
    <>
      <div className={'container px-4'}>
        <Meta title="msw" description="check msw work" />
        {props.data &&
          props.data.map((d: any, idx: number) => {
            return <div key={idx}>{idx % 50 == 0 ? <>{d.title}</> : <></>}</div>;
          })}
        <div>
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="!p-4">
              </Table.HeadCell>
              <Table.HeadCell>
                Product name
              </Table.HeadCell>
              <Table.HeadCell>
                Color
              </Table.HeadCell>
              <Table.HeadCell>
                Category
              </Table.HeadCell>
              <Table.HeadCell>
                Price
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">
                  Edit
                </span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Apple MacBook Pro 17"
                </Table.Cell>
                <Table.Cell>
                  Sliver
                </Table.Cell>
                <Table.Cell>
                  Laptop
                </Table.Cell>
                <Table.Cell>
                  $2999
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="/tables"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Microsoft Surface Pro
                </Table.Cell>
                <Table.Cell>
                  White
                </Table.Cell>
                <Table.Cell>
                  Laptop PC
                </Table.Cell>
                <Table.Cell>
                  $1999
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="/tables"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
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
