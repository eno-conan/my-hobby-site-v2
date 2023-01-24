import React from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../page";
import MainLayout from "src/components/layout";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getRecordDetail } from "src/hooks/recordsDetail";

// 詳細表示画面
const RecordDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const res: UseQueryResult<any, Error> = useQuery({
    queryKey: ["recordDetail", id],
    queryFn: () => getRecordDetail(id),
    keepPreviousData: false,
    refetchInterval: 300000, // 5m
    staleTime: Infinity,
    // cacheTime: 300000, // default:5m
  });
  // console.log(res.data);
  return (
    <>Hello</>
  );
};

export default RecordDetail;

RecordDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;
