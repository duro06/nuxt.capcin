import axios from 'axios'
import * as auth from './auth_service'
import store from '@/store'

// axios.defaults.withCredentials = true;

export function http () {
  return axios.create({
    baseURL: store.getters.apiUrl,
    // withCredentials: true,
    headers: {
      Authorization: 'Bearer ' + auth.getAccessToken()
    }
  })
}
export function httpMe () {
  return {
    baseURL: 'localhost:8080',
    headers: {
      'Content-Location': 'text/plain'
    }
  }
}
export function pusher () {
  return {
    baseURL: store.state.server,
    withCredentials: true,
    headers: {
      Authorization: 'Bearer ' + auth.getAccessToken()
    }
  }
}
export function httpFile () {
  return axios.create({
    baseURL: store.getters.apiUrl,
    headers: {
      Authorization: 'Bearer ' + auth.getAccessToken(),
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function httpNot () {
  return axios.create({
    baseURL: store.getters.apiUrl,
    headers: {

      Authorization: 'Bearer ' + auth.getAccessToken(),
      'Content-Type': 'application/json'
    }
  })
}
