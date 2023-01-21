import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getRecords } from 'src/hooks/records'
import Meta from 'src/components/Meta';
import { NextPageWithLayout } from './page';
import MainLayout from 'src/components/layout';
import { IDisplayRecord, IRecordsAndCount } from 'types/record';
import { Checkbox, Table } from 'flowbite-react';
import { useState } from "react";


// テーブルのヘッダー情報
function TableHeader() {
    return (
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
    )
}

const Records: NextPageWithLayout = () => {
    // 現在のページ数を管理
    const [page, setPage] = useState(0)
    const [checkState, setCheckState] = useState<string>('');
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
                    {TableHeader()}
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
                <div className="flex flex-col items-center">
                    <span className="text-xl text-gray-700 dark:text-gray-400 my-2">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{10 * page + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{10 * page + res.data.records.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{res.data.count}</span> Records
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">

                        <button
                            onClick={() => setPage(old => Math.max(old - 1, 0))}
                            disabled={page === 0}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white disabled:text-gray-100 bg-purple-600 rounded-l hover:bg-purple-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                            Prev
                        </button>
                        <button onClick={() => {
                            if (!res.isPreviousData) {
                                setPage(old => old + 1)
                            }
                        }}
                            disabled={(10 * page + res.data.records.length) == res.data.count}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white disabled:text-gray-100 bg-purple-600 border-0 border-l border-gray-700 rounded-r hover:bg-purple-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-600">
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