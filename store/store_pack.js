import * as store from '.'
import { http } from '@/assets/services/http_service'
import { getUserId } from '@/assets/services/auth_service'

const state = () => ({
  packingOrders: [],
  orderId: null
})
/// ////////////////////////////////////////////
const mutations = {
  setPackingOrders (state, payload) {
    state.packingOrders = payload
  },
  delPackingOrders (state) {
    state.packingOrders = []
  },
  setOrderId (state, payload) {
    state.orderId = payload
  },
  delOrderId (state) {
    state.orderId = null
  }
}
/// ///////////////////////////////////////////
const actions = {
  getPackingOrder ({ commit }) {
    commit('delPackingOrders')
    const id = store.state.profile.id
    let ID
    if (id) {
      ID = id
    } else {
      ID = getUserId()
    }
    return new Promise((resolve, reject) => {
      http()
        .get(`admin/packing-by-id-user/${ID}`)
        .then((res) => {
          if (res.status == 200) {
            const getOrders = res.data.data
            commit('setPackingOrders', getOrders)
            resolve(res.data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
/// /////////////////////////////////////
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
