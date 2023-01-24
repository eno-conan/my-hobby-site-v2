import wretch from "wretch";
export function getRecordDetail(id: String | String[] | undefined) {
  return wretch(`/api/record?id=${id}`).get().json();
}
