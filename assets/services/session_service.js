import { http } from './http_service.js'

// export function getSession(params) {
//   return http().get(`user/session`, params);
// }
export function getSession () {
  return http().get('user/session')
}
export function updateSession (params) {
  return http().post('user/session-update', params)
}
