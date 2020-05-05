// import * as pusher from "../services/pusher_service";
import * as store from '.'
import * as auth from '@/assets/services/auth_service'
import * as ord from '@/assets/services/order_service'
import { http } from '@/assets/services/http_service'

const state = () => ({
  successOrder: {},
  Order: [],
  Items: [],
  Focus: {},
  Update: null,
  meta: {},
  localOrder: []
})
const mutations = {
  //= =============== mitra local order ======
  setLocalOrder (state, payload) {
    state.localOrder = payload
  },
  delLocalOrder (state) {
    state.localOrder = []
  },
  //= ========== mitra success order message =====
  setSuccessOrder (state, payload) {
    state.successOrder = payload
  },
  delSuccessOrder (state) {
    state.successOrder = []
  },
  //= ============ mitra order to subscribe ====
  setOrder (state, payload) {
    state.Order = payload
  },
  gantiStatus (state, payload) {
    state.Focus.status_id = payload
  },
  updateOrder (state, payload) {
    state.Order.forEach((data) => {
      if (data.id == payload.id) {
        data.status_id = payload.status_id
        data.status = payload.status
      }
    })
  },
  delOrder (state) {
    state.Order = []
  },
  //= ==========mitra order items ====
  pushOrderItems (state, payload) {
    state.Items.push(payload)
  },
  setOrderItems (state, payload) {
    state.Items = payload
  },
  delOrderItems (state) {
    state.Items = []
  },

  updateOrderItems (state, payload) {
    state.Items.forEach((e) => {
      if (e.id === payload.id) {
        e.status.name = payload.status
      }
    })
  },
  //= ========== order focus from notifcation mitra ====
  setOrderFocus (state, payload) {
    state.Focus = payload

    // console.log("fokus", payload);
  },
  //= ====== mitra order meta ==
  setMitraOrderMeta (state, payload) {
    state.meta = payload
  },

  //= ===not yet used ===
  needUpdate (state, payload) {
    state.orderUpdate = payload
  }
}
const actions = {
  confirmOrder ({ state, commit }, payload) {
    // order_id sama status id
    commit('gantiStatus', 6)
    return new Promise((resolve, reject) => {
      http()
        .put(`user/orders/${payload}`, state.Focus)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  setMeta ({ commit }, payload) {
    commit('setMitraOrderMeta', payload)
  },
  getDataOrder ({ commit }, payload) {
    commit('delOrderItems')
    return new Promise((resolve, reject) => {
      http()
        .get('user/orders-user', payload)
        .then((res) => {
          commit('setOrderItems', res.data.data.data)
          const par = res.data.data
          let more
          if (par.current_page < par.last_page) {
            more = true
          } else {
            more = false
          }
          const meta = {
            current: par.current_page,
            last: par.last_page,
            more
          }
          commit('setMitraOrderMeta', meta)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  async getOrderData ({ commit }, payload) {
    try {
      const res = await ord.getOrder(payload)
      commit('setOrderItems', res.data.data.data)
      const par = res.data.data
      let more
      if (par.current_page < par.last_page) {
        more = true
      } else {
        more = false
      }
      const meta = {
        current: par.current_page,
        last: par.last_page,
        more
      }
      commit('setMitraOrderMeta', meta)
      this.store.commit('notLoading')
    } catch (e) {
      this.store.commit('notLoading')
    }
  },
  async ambilOrder () {
    this.store.commit('loading')
    this.store.commit('order/delOrder')
    let items
    const id = store.state.profile.id
    let ID
    if (id) {
      ID = id
    } else {
      ID = auth.getUserId()
    }

    const params = {
      params: {
        q: ID
      }
    }

    try {
      const res = await ord.getToNotif(params)
      items = res.data.data
      this.store.commit('notLoading')
      this.store.commit('order/setOrder', items)
    } catch (e) {
      this.store.commit('notLoading')
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
