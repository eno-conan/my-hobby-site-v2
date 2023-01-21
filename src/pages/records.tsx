import React from 'react'
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getRecords } from 'src/hooks/records'
import Meta from 'src/components/Meta';
import { NextPageWithLayout } from './page';
import MainLayout from 'src/components/layout';
import { IDisplayRecord, IRecordsAndCount } from 'types/record';
import { Checkbox, Table } from 'flowbite-react';
// import styles from "../styles/pages/records.module.css";

const Records: NextPageWithLayout = () => {
    const [page, setPage] = React.useState(0)
    // データ一覧を取得
    const res: UseQueryResult<IRecordsAndCount, Error> = useQuery(
        {
            queryKey: ["records", page],
            queryFn: () => getRecords(page),
            keepPreviousData: true,
            refetchInterval: 300000, // 5m
            staleTime: Infinity,
            // cacheTime: 300000, // default:5m
        }
    )

    const [checkState, setCheckState] = React.useState<string>('');
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    // ページングの現在のページ数を管理
    // 最初に取得する件数を多めにして、DBアクセス回数を減らす
    // 初期表示件数を少なめにして、DBに都度アクセスする？
    // 検索したときだけDBにアクセスするか？
    // https://www.prisma.io/docs/concepts/components/prisma-client/pagination

    const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckState(event.target.value);
    }

    if (res.status === "loading") return <h1>Loading...</h1>
    if (res.status === "error") {
        return <h1>{JSON.stringify(res.error)}</h1>
    }

    return (
        <>
            <div className={'container mx-auto px-4'}>
                <Meta title="記録一覧画面" description="レコード一覧を表示する画面" />
                {/* 各チェックボックスのstate管理については慎重に実装 */}
                <Table hoverable={true} border={4} align={'center'} className={'my-4'}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell className="pr-16">
                            タイトル
                        </Table.HeadCell>
                        <Table.HeadCell className="pr-16">
                            概要
                        </Table.HeadCell>
                        <Table.HeadCell className="pr-8">
                            完了状態
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {res.data.records.map((rcd: IDisplayRecord) => (
                            <Table.Row className="bg-purple-50 dark:border-gray-700 dark:bg-gray-800" key={rcd.id}>
                                <Table.Cell className="!p-4">
                                    <Checkbox value={'1'} onChange={setValue} checked={checkState == '1'} />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {rcd.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-sans text-gray-700 dark:text-white">
                                    {rcd.description}
                                </Table.Cell>
                                <Table.Cell>
                                    未完了
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                {/* Pagination */}
                <div>
                    <span>Current Page: {page + 1}</span>
                    <div></div>
                    <button
                        onClick={() => setPage(old => Math.max(old - 1, 0))}
                        disabled={page === 0}
                    >
                        Previous Page
                    </button>{' '}
                    <div></div>
                    <button
                        onClick={() => {
                            if (!res.isPreviousData) {
                                setPage(old => old + 1)
                            }
                        }}
                        // Disable the Next Page button until we know a next page is available
                        disabled={res.isPreviousData}
                    >
                        Next Page
                    </button>
                    {res.isFetching ? <span> Loading...</span> : null}{' '}

                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">10</span> of <span className="font-semibold text-gray-900 dark:text-white">14</span> Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">

                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Prev
                        </button>
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Records

Records.getLayout = (page) => <MainLayout>{page}</MainLayout>;