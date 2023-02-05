import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getRecords } from "src/hooks/records";
import Meta from "src/components/Meta";
import { NextPageWithLayout } from "./page";
import MainLayout from "src/components/layout";
import { IDisplayRecord, IRecordsAndCount } from "types/record";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "next/router";
import Loading from "./loading";
import Label from "src/components/ui/Label";

// テーブルのヘッダー情報
function TableHeader() {
  return (
    <thead>
      <tr>
        <th scope="col" className="px-1 py-3 text-sm font-medium text-gray-800 uppercase bg-purple-400">
          タイトル
        </th>
        <th scope="col" className="px-1 py-3 text-sm font-medium text-gray-800 uppercase bg-purple-400 hidden lg:block">
          概要
        </th>
        <th scope="col" className="px-1 py-3 text-sm font-medium text-gray-800 uppercase bg-purple-400">
          完了
        </th>
      </tr>
    </thead>
  );
}

// 一定時間処理停止
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Records: NextPageWithLayout = () => {
  // 現在のページ数を管理
  const [page, setPage] = useState(0);
  // データ一覧を取得
  const res: UseQueryResult<IRecordsAndCount, Error> = useQuery({
    queryKey: ["records", page],
    queryFn: () => getRecords(page),
    keepPreviousData: true,
    refetchInterval: 300000, // 5m
    staleTime: Infinity,
    // cacheTime: 300000, // default:5m
  });

  // 完了/未完了の出力制御
  const showFinishStatus = (finishedStatus: boolean) => {
    if (finishedStatus) {
      return <>Y</>;
    } else {
      return <>-</>;
    }
  };

  const checkRecord = (id: number) => {
    Router.push({ pathname: `record/${id}`, query: { id: id } });
  };

  // ページングしたときに、res.isRefetchingがtrueになるタイミングがある
  // stateが更新されないと、再度データ取得ができないから・・・
  if (res.status === "loading") return <Loading />;
  if (res.status === "error") {
    return <h1>{JSON.stringify(res.error)}</h1>;
  }
  // データが0件の場合
  if (res.data.records.length === 0) {
    return <h1>No Data</h1>;
  }

  // タイトルの文字数カット（スマホのときだけにする予定）
  const trimTitle = (title: string) => {
    if (title.length > 15) {
      return `${title.toString().substring(0, 20)}...`;
    }
    return title;
  };

  // 記録一覧のテーブルの内容部分
  function TableBody(data: IRecordsAndCount) {
    return (
      <>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.records.map((rcd: IDisplayRecord, idx: number) => (
            <tr key={rcd.id}>
              {/* https://docs.rome.tools/lint/rules/usekeywithclickevents/ */}
              <td
                className="px-2 py-4 whitespace-nowrap text-sm font-medium text-purple-500 dark:text-gray-200 bg-lime-50 hover:cursor-pointer hover:text-blue-800"
                onClick={() => checkRecord(rcd.id)}
              >
                {trimTitle(rcd.title)}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 hidden lg:block bg-lime-50">
                {rcd.description}
              </td>
              <td className="text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 bg-lime-50">
                {showFinishStatus(rcd.finished)}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  // レコード件数情報
  function RecordsInfo(data: IRecordsAndCount) {
    return (
      <>
        <div className="flex flex-col items-center">
          {/* <span className="text-xl text-gray-700 dark:text-gray-400 my-2">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{10 * page + 1}</span>{" "}to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{10 * page + data.records.length}</span>{" "}of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{data.count}</span>{" "}Records
          </span> */}
          <span className="text-xl text-gray-700 dark:text-gray-400 my-2">
            page
            <span className="font-semibold text-gray-900 dark:text-white"> {page + 1}</span> of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{Math.floor(data.count / 10) + 1}</span>{" "}
            <span className="font-semibold text-gray-900 dark:text-white">(total {data.count} Records )</span>
          </span>
        </div>
      </>
    );
  }

  // ページング
  function Paging(data: IRecordsAndCount) {
    return (
      <>
        <div className="flex flex-col items-center mb-4">
          <div className="inline-flex sm:mt-0">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-50 disabled:text-gray-100 bg-purple-500 rounded-l hover:bg-purple-700 disabled:bg-purple-200"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Prev
            </button>
            <button
              onClick={() => {
                if (!res.isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={10 * page + data.records.length === data.count}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-50 disabled:text-gray-100 bg-purple-500 border-0 border-l border-gray-700 rounded-r hover:bg-purple-600 disabled:bg-purple-200"
            >
              Next
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={"container mx-auto px-4"}>
        <Meta title="記録一覧画面" description="レコード一覧を表示する画面" />
        <Label type={"page"} word={"記録一覧"} />
        <div className="flex flex-col pt-2">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <TableHeader />
                  <TableBody records={res.data.records} count={res.data.count} />
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* レコード件数情報 */}
        <RecordsInfo records={res.data.records} count={res.data.count} />
        {/* Pagination */}
        <Paging records={res.data.records} count={res.data.count} />
      </div>
      {/* 取得データの確認用(開発環境のみ表示) */}
      {process.env.NEXT_PUBLIC_API_MOCKING === "enabled" ? <ReactQueryDevtools /> : <></>}
    </>
  );
};

export default Records;

Records.getLayout = (page) => <MainLayout>{page}</MainLayout>;
