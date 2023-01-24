import wretch from "wretch";
export function getRecords(page: number) {
  return wretch(`/api/records?page=${page}`).get().json();
}
