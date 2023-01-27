import { useQuery, UseQueryResult } from "@tanstack/react-query";
import MainLayout from "src/components/layout";
import { getRecordsChart } from "src/hooks/recordsChart";
import { IRecordsChart } from "types/record";
import { NextPageWithLayout } from "./page";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Meta from "src/components/Meta";
import Loading from "./loading";

// チャートの設定
Chart.register(...registerables);

const options: {} = {
  plugins: {
    legend: {
      labels: {
        color: "purple", // not 'fontColor:' anymore
        font: {
          size: 14, // 'size' now within object 'font {}'
        },
      },
    },
    scales: {
      // 軸設定
      xAxes: [
        // x軸設定
        {
          scaleLabel: {
            // 軸ラベル
            display: true, // 表示設定
            labelString: "横軸ラベル", // ラベル
            fontColor: "red", // 文字の色
            fontSize: 16, // フォントサイズ
          },
          gridLines: {
            // 補助線
            color: "rgba(255, 0, 0, 0.2)", // 補助線の色
          },
          ticks: {
            // 目盛り
            fontColor: "red", // 目盛りの色
            fontSize: 14, // フォントサイズ
          },
        },
      ],
    },
  },
  maintainAspectRatio: true,
  responsive: true,
};

const RecordsChart: NextPageWithLayout = () => {
  function setData(data: IRecordsChart[]) {
    // グラフのラベル
    const labels: string[] = [];
    // データ情報
    const countData: number[] = [];
    // 対象月の情報設定
    let targetYearMonth: string = "";
    data.map((cntData, idx) => {
      if (idx === 0) {
        targetYearMonth = `${cntData.targetYearMonth?.substring(1, 5)}年${cntData.targetYearMonth?.substring(5, 7)}月`;
      }
      // yyyy/、部分はカット
      labels.push(cntData.createdDate.substring(5));
      countData.push(cntData.count);
    });
    // 表示データの設定
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "記録数",
          data: countData,
          borderColor: "rgb(138,57,226)",
        },
      ],
    };
    return (
      <>
        <div className={"text-2xl text-center"}>{`記録数グラフ ${targetYearMonth}`}</div>
        <Line height={400} width={800} data={chartData} options={options} />
      </>
    );
  }

  const res: UseQueryResult<IRecordsChart[], Error> = useQuery({
    queryKey: ["recordsChart"],
    queryFn: () => getRecordsChart(),
    keepPreviousData: true,
    refetchInterval: 300000, // 5m
    staleTime: Infinity,
  });

  if (res.status === "loading") return <Loading/>;
  if (res.status === "error") {
    return <h1>{JSON.stringify(res.error)}</h1>;
  }

  return (
    <>
      <Meta title="記録集計表" description="当月の記録数一覧を表示" />
      <div>{setData(res.data)}</div>
    </>
  );
};

export default RecordsChart;
RecordsChart.getLayout = (page) => <MainLayout>{page}</MainLayout>;
