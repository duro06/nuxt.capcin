import { http } from './http_service.js'

export function getOrder (params) {
  return http().get('user/orders-user', params)
}

export function getToNotif (params) {
  return http().get('user/orders-all', params)
}

export function purchase (params) {
  return http().post('user/orders', params)
}

export function chartOrder (params) {
  return http().post('user/chart-orders', params)
}

export function detail (params) {
  return http().get('user/detail-orders', params)
}

export function getDetail (params) {
  return http().get('user/detail-orders', params)
}
