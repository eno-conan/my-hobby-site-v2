import wretch from 'wretch'
export function getRecords() {
    return wretch(`/api/records`).get().json()
}