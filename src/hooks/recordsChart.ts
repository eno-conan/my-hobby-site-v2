import wretch from "wretch";
// 集計した日付ごとの記録数を取得
export function getRecordsChart() {
  return wretch("/api/recordsChart").get().json();
}
