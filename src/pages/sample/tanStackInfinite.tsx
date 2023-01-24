import React, { useState } from "react";
import MainLayout from "src/components/layout";
import { NextPageWithLayout } from "../page";
import wretch from "wretch";
import { useInfiniteQuery } from "@tanstack/react-query";

//infinite用
const getRecords2 = ({ pageParam = 1 }) => {
  console.log(pageParam);
  return wretch(`/api/records?page=${pageParam}`).get().json();
};

// unknown回避のために型設定予定
// interface Props {
//     isLoading: boolean
//     isFetching: boolean
//     data: any
//     isError: boolean
//     fetchNextPage: any
//     fetchPreviousPage: any
//     hasNextPage?: boolean
//     hasPreviousPage?: boolean
//     isFetchingNextPage: boolean
//     isFetchingPreviousPage: boolean
// }

const TanStackInfinite: NextPageWithLayout = () => {
  const [currentPageIndex, setCurrentPage] = useState(0);
  const {
    isLoading,
    isFetching,
    data,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(["records"], getRecords2, {
    getPreviousPageParam: (_lastPage, pages) => {
      return pages.length < 4 ? pages.length + 1 : undefined;
    },
    getNextPageParam: (_lastPage, pages) => {
      console.log(_lastPage);
      console.log(pages);
      return pages.length < 4 ? pages.length + 1 : undefined;
    },
  });

  const getNextPage = () => {
    fetchNextPage();
  };

  // console.log(
  //     hasNextPage,
  //     hasPreviousPage,
  // )

  if (isLoading || isFetching) {
    return <h4>loading</h4>;
  }

  if (isError) {
    return <h4>error</h4>;
  }

  return (
    <>
      <div>Hello</div>
      {/* unknown型のエラーでbuildできないので、コメントアウト */}
      {/* <div>
                {data?.pages[0].records && data?.pages[0].records.map((d: any) => {
                    return (<div>{d.title}</div>)
                })}
            </div> */}
      <button disabled={!hasNextPage} onClick={getNextPage}>
        load more
      </button>
      <button disabled={!hasNextPage} onClick={getNextPage} />
    </>
  );
};

export default TanStackInfinite;

TanStackInfinite.getLayout = (page) => <MainLayout>{page}</MainLayout>;
