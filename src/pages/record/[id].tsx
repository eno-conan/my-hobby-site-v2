import React from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../page";
import MainLayout from "src/components/layout";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getRecordDetail } from "src/hooks/recordsDetail";
import { IDisplayRecordDetail } from "types/record";

// 詳細表示画面
const RecordDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const res: UseQueryResult<IDisplayRecordDetail, Error> = useQuery({
    queryKey: ["recordDetail", id],
    queryFn: () => getRecordDetail(id),
    keepPreviousData: false,
    refetchInterval: 300000, // 5m
    staleTime: Infinity,
    // cacheTime: 300000, // default:5m
  });

  if (res.status === "loading") return <h1>Loading...</h1>;
  if (res.status === "error") {
    return <h1>{JSON.stringify(res.error)}</h1>;
  }

  if (res.data.title.length === 0) {
    return <h1>No Data</h1>;
  }

  return (
    <>
      <div>Hello</div>
      <div>{res.data.title}</div>
      <div>{res.data.description}</div>
    </>
  );
};

export default RecordDetail;

RecordDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;
