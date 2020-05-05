import { http } from '@/assets/services/http_service'

const state = () => ({ items: [], bubuks: [], newUser: '' })
/// //////////////////////////////////////////////////////
const mutations = {
  setItems (state, payload) {
    state.items = payload
  },
  setBubuks (state, payload) {
    state.bubuks = payload
  },
  setUser (state, payload) {
    state.newUser = payload
  }
}
/// /////////////////////////////////////////////////////
const actions = {
  // eslint-disable-next-line no-empty-pattern
  // eslint-disable-next-line no-unused-vars
  isiStockAwal ({ commit }, payload) {
    return new Promise((resolve) => {
      const data = { stok_awal: payload.data }
      http()
        .put(`admin/mitra-update-stok/${payload.id}`, data)
        .then((res) => {
          // let dataReturn = res.data.data;
          // commit("setItems", dataReturn);
          resolve(res)
        })
    })
  },
  remove ({ commit }, payload) {
    commit('setUser', payload)
  },
  getItemById ({ commit }, payload) {
    return new Promise((resolve) => {
      http()
        .get(`admin/mitra-items/${payload}`)
        .then((res) => {
          const dataReturn = res.data.data
          commit('setItems', dataReturn)
          resolve(dataReturn)
        })
    })
  },
  getAllBubuk ({ commit }) {
    return new Promise((resolve) => {
      http()
        .get('/admin/mitra-bubuk-all')
        .then((res) => {
          const dataReturn = res.data.data
          commit('setBubuks', dataReturn)
          resolve(dataReturn)
        })
    })
  },
  // eslint-disable-next-line no-unused-vars
  laporanHarian ({ commit }, payload) {
    return new Promise((resolve) => {
      http()
        .post('/admin/mitra-input-penjualan', payload)
        .then((res) => {
          const dataReturn = res.data
          // commit("setBubuks", dataReturn);
          resolve(dataReturn)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
