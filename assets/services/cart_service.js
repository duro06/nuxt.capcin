import { http } from './http_service.js'

export function getChart (params) {
  return http().get('user/charts', params)
}

export function toChart (params) {
  return http().post('user/charts', params)
}
export function delChart (params) {
  return http().delete(`user/delete-charts/${params}`)
}
export function updateChart (chart, params) {
  return http().put(`user/update-charts-qty/${chart}`, params)
}
