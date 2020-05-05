import { http } from '@/assets/services/http_service'
import { getUserId } from '@/assets/services/auth_service'
// import store from ".";

const state = () => ({
  shipping: [],
  detail: {}
})
/// ////////////////////////////////////////
const mutations = {
  setShipping (state, payload) {
    state.shipping = payload
  },
  delShipping (state) {
    state.shipping = []
  },
  setDetail (state, payload) {
    state.detail = payload
  },
  delDetail (state) {
    state.detail = {}
  }
}
/// ///////////////////////////////////////
const actions = {
  setDetails ({ commit }, payload) {
    commit('delDetail')
    commit('setDetail', payload)
  },
  getShipping ({ commit }) {
    commit('delShipping')

    const ID = getUserId()

    return new Promise(() => {
      http()
        .get(`admin/supplier-by-id-user/${ID}`)
        .then((res) => {
          if (res.status == 200) {
            const data = res.data.data
            commit('setShipping', data)
          }
        })
        .catch(() => {})
    })
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
