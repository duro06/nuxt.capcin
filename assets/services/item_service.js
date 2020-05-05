import { http } from './http_service.js'

export function loadData (params) {
  return http().get('user/items', params) // ambil data dari server item
}
export function loadMore (page) {
  return http().get(`user/items?page=${page}`)
}
