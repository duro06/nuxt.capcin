import Pusher from 'pusher-js'
import * as auth from './auth_service'
import store from '@/store'

//= ===================== pusher =======
export function subscribe (order) {
  // Api key + cluster

  const pusher = new Pusher('ebfe3f8ff45ad9c3ad4c', {
    cluster: 'ap1',
    authEndpoint: `${store.state.server}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: 'Bearer ' + auth.getAccessToken()
      }
    },
    forceTLS: true
  })

  // ===== ini pusher nya mas hari =========================
  // let pusher = new Pusher("c1b487e073e0124e259f", {
  //   cluster: "ap1",
  // authEndpoint: `${store.state.server}/broadcasting/auth`,
  //   auth: {
  //     headers: {
  //       Authorization: "Bearer " + auth.getAccessToken()
  //     }
  //   },
  //   forceTLS: true
  // });

  const channel = pusher.subscribe('private-capcin-tracker.' + order)
  // let channel = pusher.subscribe("capcin-tracker." + order);

  channel.bind('OrderStatusChanged', (data) => {
    store.commit('setNotification', data)
    store.commit('order/setOrderFocus', data)
    store.commit('order/updateOrder', data)
    store.commit('order/updateOrderItems', data)
  })
}

export function register (order) {
  // Api key + cluster

  const pusher = new Pusher('ebfe3f8ff45ad9c3ad4c', {
    cluster: 'ap1',
    forceTLS: true
  })

  const channel = pusher.subscribe('capcin-reg.' + order)
  channel.bind('App\\Events\\RegisterEvent', (data) => {
    if (data != '') {
      store.commit('setReg', data)
    }
  })
}

export function produksi (id) {
  // Api key + cluster

  const pusher = new Pusher('c1b487e073e0124e259f', {
    cluster: 'ap1',
    forceTLS: true
  })
  // ini masih persiapan...
  const channel = pusher.subscribe('capcin-reg.' + id)
  channel.bind('App\\Events\\RegisterEvent', (data) => {
    if (data != '') {
      store.dispatch('destroyVerifie')
    }
  })
}
