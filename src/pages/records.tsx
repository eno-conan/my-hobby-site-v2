import React from 'react'
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getRecords } from 'src/hooks/records'
import Meta from 'src/components/Meta';
import { NextPageWithLayout } from './page';
import MainLayout from 'src/components/layout';
import { IDisplayRecord } from 'types/record';
import { Checkbox, Table } from 'flowbite-react';
// import styles from "../styles/pages/records.module.css";

const Records: NextPageWithLayout = () => {
    // データ一覧を取得
    const records: UseQueryResult<IDisplayRecord[], Error> = useQuery(
        {
            queryKey: ["records"],
            queryFn: () => getRecords(),
            refetchInterval: 300000, // 5m
            staleTime: Infinity,
            // cacheTime: 300000, // default:5m
        }
    )

    const [checkState, setCheckState] = React.useState('');

    const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckState(event.target.value);
    }

    if (records.status === "loading") return <h1>Loading...</h1>
    if (records.status === "error") {
        return <h1>{JSON.stringify(records.error)}</h1>
    }

    return (
        <>
            <div className={'container mx-auto px-4'}>
                <Meta title="記録一覧画面" description="レコード一覧を表示する画面" />
                {/* 各チェックボックスのstate管理については慎重に実装 */}
                <Table hoverable={true} className={'my-4'}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>
                            タイトル
                        </Table.HeadCell>
                        <Table.HeadCell>
                            概要
                        </Table.HeadCell>
                        <Table.HeadCell>
                            完了状態
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {records.data.map((rcd: IDisplayRecord) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={rcd.id}>
                                <Table.Cell className="!p-4">
                                    <Checkbox value={'1'} onChange={setValue} checked={checkState == '1'} />
                                </Table.Cell>
                                <Table.Cell className="!p-4">
                                    {rcd.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {rcd.description}
                                </Table.Cell>
                                <Table.Cell>
                                    未完了
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}

export default Records

Records.getLayout = (page) => <MainLayout>{page}</MainLayout>;