import { http } from './http_service.js'

/*
jika ingin melihat route apa saja yang tersedia cek di laravel
pakai php artisan route:list
*/

export function loadData (params) {
  return http().get('user/products', params)
}

export function loadMore (page) {
  return http().get(`user/products?page=${page}`)
}

export function getById (params) {
  return http().get(`user/products/${params}/edit`)
}
