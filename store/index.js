// import store from '.'
import { http } from '@/assets/services/http_service.js'
import * as prod from '@/assets/services/product_service.js'
import { setToken } from '@/assets/services/auth_service.js'

export const state = () => ({
  // server: "http://192.168.43.231:8000",
  // server: 'http://192.168.0.104:8000',
  server: 'http://localhost:8000',
  // serverApi: "http://localhost:8000/api/",
  // serverApi2: "http://localhost:8000/api",
  // serverImage: "http://localhost:8000/storage/",
  token: process.browser ? localStorage.getItem('access_token') : null,
  adminVerified: process.browser ? localStorage.getItem('waiting_verivication') : null,
  profile: {},
  products: [],
  productDetails: [],
  loadShow: '',
  notification: [],
  registrasi: [],
  cart: 0,
  mitraProductMeta: {}

})
export const mutations = {
  //= ========  profile ====
  setAuthenticate (state, payload) {
    state.profile = payload
  },
  delAuthenticate (state) {
    state.profile = {}
  },
  //= ==========register verivication===========
  setRetrieveVerifie (state, msg) {
    state.adminVerified = msg
  },
  setDestroyverifie (state) {
    state.adminVerified = null
  },
  setReg (state, payload) {
    state.registrasi.push(payload)
  },
  delReg (state) {
    state.registrasi = []
  },

  //= ================ token ======
  setRetrieveToken (state, token) {
    state.token = token
  },
  setDestroyToken (state) {
    state.token = null
  },
  //= ======= mitra product ========
  setProduct (state, payload) {
    state.products = payload
  },
  pushProduct (state, payload) {
    state.products.push(payload)
  },
  delProduct (state) {
    state.products = []
  },
  //= ==========detail product ======
  setDetailsProduct (state, payload) {
    state.productDetails = payload
  },
  delDetailsProduct (state) {
    state.productDetails = []
  },
  // =========== loading ==============
  loading (state) {
    state.loadShow = 'payload'
  },
  notLoading (state) {
    state.loadShow = ''
  },
  //= ====== mitra product meta ==
  setMitraProductMeta (state, payload) {
    state.mitraProductMeta = payload
  },
  // ====mitra notification =============
  delNotification (state) {
    state.notification = []
  },
  setNotification (state, payload) {
    if (!payload.read) {
      state.notification.unshift(payload)
      // state.notification.push(payload);
    }
    // writeNotif();
  },
  allNotifIsRead (state) {
    state.notification.forEach((e) => {
      e.data.read = true
    })
  },
  notifIsRead (state, payload) {
    state.notification.filter((e) => {
      if (e.id == payload) {
        e.data.read = true
      }
    })
    // const temp = state.notification.filter(
    //   e => e.id === payload && e.data.read == false
    // );
    // console.log("temp", temp);
    // if (temp.length) {
    //   temp[0].data.read = true;
    //   console.log("notif", temp);
    //   if (temp.length > 1) {
    //     state.notification.forEach(e => {
    //       if (e.id == temp[0].id) {
    //         e.data.read = temp[0].data.read;
    //       }
    //     });
    //   } else {
    //     state.notification.data.read = temp[0].data.read;
    //   }
    // }
  },
  //= ====mitra cart========
  setCart (state, payload) {
    state.cart = payload
  }
}
export const getters = {
  serverUrl (state) {
    return state.server + '/home'
  },
  apiUrl (state) {
    return state.server + '/api'
  },
  storageUrl (state) {
    return state.server + '/storage/'
  },
  loggedIn (state) {
    return state.token !== null
  },
  levelAccess (state) {
    return state.profile.role
  },
  waitingVerified (state) {
    return state.adminVerified !== null
  },
  myProfile (state) {
    return state.profile
  },
  loading (state) {
    return state.loadShow !== ''
  }
}
export const actions = {
  getProductById ({ commit }, payload) {
    commit('delDetailsProduct')
    return new Promise((resolve, reject) => {
      prod
        .getById(payload)
        .then((res) => {
          if (res.status == 200) {
            const details = res.data.data[0].detail_items
            commit('setDetailsProduct', details)
            resolve(res.data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  setNotification ({ commit }, payload) {
    commit('setNotification', payload)
  },
  readNotification ({ commit }, payload) {
    commit('notifIsRead', payload)
  },
  delNotification ({ commit }) {
    commit('delNotification')
  },
  /// ===============product ======
  productIn (context, payload) {
    context.commit('setProduct', payload, { root: true })
  },
  productPush (context, payload) {
    context.commit('pushProduct', payload, { root: true })
  },
  productOut (context) {
    context.commit('delProduct', { root: true })
  },
  //= =================product details ===========
  detailsIn (context, payload) {
    context.commit('setDetailsProduct', payload, { root: true })
  },
  //= ====================auth====================
  aunthenticate (context, payload) {
    context.commit('setAuthenticate', payload, { root: true })
    // localStorage.setItem("role", payload.role);
  },
  actToken (context, payload) {
    context.commit('setRetrieveToken', payload, { root: true })
  },
  destroyVerifie (context) {
    if (process.browser) {
      localStorage.removeItem('waiting_verivication')
      context.commit('setDestroyverifie', {
        root: true
      })
    }
  },
  retrieveVerifie (contex) {
    if (process.browser) {
      localStorage.setItem('waiting_verivication', contex)
      contex.commit('setRetrieveVerifie', {
        root: true
      })
    }
  },
  retrieveName () {
    return new Promise((resolve, reject) => {
      http()
        .get('auth/profile')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  register (context, data) {
    return new Promise((resolve, reject) => {
      http()
        .post('client/register', data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  destroyToken (context) {
    if (getters.loggedIn) {
      console.log(getters.loggedIn)
      http()
        .get('auth/logout')
        .then((response) => {
          this.flashMessage.success({
            message: response.data.message,
            time: 2000
          })
        })
        .catch(() => {})
      if (process.browser) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('level')
        localStorage.removeItem('notif')
        context.commit('setDestroyToken', {
          root: true
        })
        context.commit('delAuthenticate', {
          root: true
        })
      } else {
        localStorage.removeItem('role')
      }
    }
  },
  retrieveToken (context, credentials) {
    return new Promise((resolve, reject) => {
      http()
        .post('auth/login', credentials)
        .then((response) => {
          setToken(response.data)
          this.flashMessage.success({
            message: 'Login success',
            time: 2000
          })
          resolve(response)
        })
        .catch((error) => {
          // console.log(error)
          if (error.response != undefined) {
            reject(error)
          }
        })
    })
  },
  retrieveOrder (context, credentials) {
    return new Promise((resolve, reject) => {
      http()
        .post('user/orders', credentials)
        .then((response) => {
          setToken(response.data)
          this.flashMessage.success({
            message: response.data.message,
            time: 2000
          })
          resolve(response)
        })
        .catch((error) => {
          if (error.response != undefined) {
            this.flashMessage.success({
              message: error.response.message,
              time: 2000
            })
            reject(error)
          }
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
