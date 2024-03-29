import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "src/components/layout";
import Meta from "src/components/Meta";
import styles from "../styles/Home.module.css";
import { NextPageWithLayout } from "./page";

const SECTIONS = [
  { title: "Add Record", link: "/add" },
  { title: "Check Records", link: "/records" },
  { title: "Records Chart", link: "/recordsChart" },
  { title: "Mock Service Worker", link: "/sample/msw" },
  { title: "Radix", link: "/sample/radix" },
  { title: "LearnMemo", link: "/sample/learnMemo" },
  // { title: "tanStackInfinite", link: "/sample/tanStackInfinite" },
];

const Home: NextPageWithLayout = () => {
  // const { isJapanese } = useLocale();
  return (
    <div className={styles.container}>
      <Meta />

      <div className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>

        <div className="grid grid-cols-12 gap-4">
          {SECTIONS?.map((meta) => (
            <div
              key={meta.title}
              className="col-span-12 md:col-span-6 p-2 flex flex-col"
            >
              <div className="flex flex-col space-y-2 p-4">
                <Link href={`${meta.link}`}>
                  <span className="headingxs cursor-pointer hover:underline text-2xl">
                    {meta.title}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* <div className={'ml-4 font-bold'}>
                <h4>{isJapanese ? '国際化対応' : 'i18n'}</h4>
            </div>
            <NextLink href={'/sample/rhfzod'} locale={'ja'} passHref>
                <button className={`${styles.Button} ${styles.violet}`}>日本語</button>
            </NextLink>
            <NextLink href={'/sample/rhfzod'} locale={'en'} passHref>
                <button className={`${styles.Button} ${styles.violet}`}>英語</button>
            </NextLink> */}
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
