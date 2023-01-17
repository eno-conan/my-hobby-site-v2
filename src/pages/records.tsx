import React from 'react'
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getRecords } from 'src/hooks/records'
import Meta from 'src/components/Meta';

export interface IRecord {
    id: number;
    title: string
    description: string
    detail: string
    finished: boolean
    updatedAt: string
}

const Records = () => {
    // データ一覧を取得
    const records: UseQueryResult<IRecord[], Error> = useQuery(
        {
            queryKey: ["records"],
            queryFn: () => getRecords(),
            refetchInterval: 300000, // 5m
            staleTime: Infinity,
            // cacheTime: 300000, // default:5m
        }
    )

    if (records.status === "loading") return <h1>Loading...</h1>
    if (records.status === "error") {
        return <h1>{JSON.stringify(records.error)}</h1>
    }

    return (
        <>
            <div className={'container mx-auto px-8'}>
                <Meta title="記録一覧画面" description="レコード一覧を表示する画面" />
                {records.data.map((rcd: IRecord) => (
                    <div key={rcd.id}>
                        {rcd.title}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Records
