import * as store from '.'
import { http } from '@/assets/services/http_service'
// eslint-disable-next-line no-unused-vars

const state = () => ({
  notifications: []
})
/// ///////////////////////
const mutations = {
  setNotifications (state, payload) {
    state.notifications = payload
  },
  delNotifications (state) {
    state.notifications = []
  }
}
/// ///////////////////////
const actions = {
  getNotifications () {
    return new Promise((resolve) => {
      http()
        .get('user/notification')
        .then((res) => {
          const existingNotif = store.state.notification
          const notif = res.data.data
          store.mutations.commit('delNotification')
          const newNotif = []
          if (existingNotif.length) {
            const terbaca = existingNotif.filter(data => data.data.read == true)
            notif.forEach((data) => {
              newNotif.push(data)
            })
            if (terbaca.length) {
              terbaca.forEach((data) => {
                newNotif.push(data)
              })
            }
          } else {
            notif.forEach((data) => {
              newNotif.push(data)
            })
          }
          newNotif.forEach((data) => {
            store.mutations.commit('setNotification', data)
          })
          if (res.status == 200) {
            resolve(res.data)
          }
        })
    })
  },
  // eslint-disable-next-line no-unused-vars
  readNotifications ({ commit }, params) {
    const data = new FormData()
    data.append('id', params)
    return new Promise((resolve) => {
      http()
        .post('user/notification', data)
        .then((res) => {
          if (res.status == 200) {
            resolve(res.data)
          }
        })
    })
  },
  readAllNotifications () {
    return new Promise((resolve) => {
      http()
        .post('user/notification-all')
        .then((res) => {
          if (res.status == 200) {
            resolve(res.data)
          }
        })
    })
  }
}
/// ///////////////////////

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
