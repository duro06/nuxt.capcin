import jwt from 'jsonwebtoken'
import store from '@/store'
// import { mapState } from "vuex";

export function writeNotif () {
  if (process.browser) {
    const data = store.state.order.Order
    if (store.state.notification) {
      const pesan = store.state.notification.filter(e => e.read === false)
      const notif = jwt.sign(
        { message: pesan, items: data },
        'Pala64564ha@sakuranandaniyu99865773838'
      )
      localStorage.setItem('notif', notif)
    } else {
      const notif = jwt.sign(
        {
          items: data
        },
        'Pala64564ha@sakuranandaniyu99865773838'
      )
      localStorage.setItem('notif', notif)
    }
  }
}

export function readNotif () {
  if (process.browser) {
    const notif = localStorage.getItem('notif')
    if (notif) {
      const message = jwt.decode(notif)
      const data = message.items
      if (message.message.length) {
        message.message.forEach((e) => {
          store.commit('setNotification', e)
        })
      }
      if (data.length) {
        const items = store.state.order.Order
        data.forEach((local) => {
          const ada = items.filter((item) => {
            if (item.id == local.id && item.status_id != local.status_id) {
              return true
            }
          })
          if (ada.length) {
            const data = ada[0]
            store.commit('setNotification', data)
            store.commit('order/updateOrder', data)
          }
        })
      }
      return message
    } else {
      return 'tidak ada data'
    }
  }
}

export function updateNotif () {
  if (process.browser) {
    localStorage.removeItem('notif')
    if (store.state.notification) {
      const data = store.state.order.Order
      const pesan = store.state.notification.filter(e => e.read === false)
      const notif = jwt.sign(
        { message: pesan, items: data },
        'Pala64564ha@sakuranandaniyu99865773838'
      )
      localStorage.setItem('notif', notif)
    }
  }
}

export function writeOrder (newValue, oldValue) {
  if (process.browser) {
    localStorage.removeItem('order')
    const order = jwt.sign(
      { newItems: newValue, oldItems: oldValue },
      'Pala64564ha@sakuranandaniyu99865773838'
    )
    localStorage.setItem('order', order)
  }
}
export function read () {
  if (process.browser) {
    const notif = localStorage.getItem('order')
    if (notif) {
      const message = jwt.decode(notif)
      const data = message
      return data
    } else {
      return 'tidak ada data order'
    }
  }
}
