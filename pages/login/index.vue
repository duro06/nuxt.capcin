<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4 box">
          <div class="">
            <h1 class="avatar has-text-centered section">
              <img src="@/assets/img/logocapcin.png" alt="logo">
            </h1>
          </div>

          <transition name="slide-fade">
            <div class="">
              <p id="log" class="subtitle has-text-black">
                Please login to proceed.
              </p>
            </div>
          </transition>
          <form action class="has-text-left">
            <client-only>
              <div class="login-form">
                <form role="form" method="post">
                  <div class="field ">
                    <p
                      class="help align-left is-danger"
                      :style="{ display: mailMessage }"
                    >
                      {{ mail }}
                    </p>
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="user.email"
                        :class="['input', classDanger, 'is-small']"
                        type="email"
                        placeholder="Email"
                        data-lpignore="true"
                      >
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope" />
                      </span>
                      <span
                        class="icon is-small is-right"
                        :style="{ visibility: visClass }"
                      >
                        <i class="fas fa-exclamation-triangle" />
                      </span>
                    </p>
                    <p
                      :class="[
                        'help',
                        'align-left',
                        classDanger,
                        formValidation()
                      ]"
                      :style="{ visibility: visClass }"
                    >
                      {{ validMail }}
                    </p>
                  </div>

                  <div class="field ">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="user.password"
                        :class="['input', passOk(), 'is-small']"
                        type="password"
                        placeholder="Password"
                        data-lpignore="true"
                      >
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock" />
                      </span>
                      <span
                        class="icon is-small is-right is-success"
                        :style="{ visibility: visPass }"
                      >
                        <i class="fas fa-check" />
                      </span>
                    </p>
                    <p :class="['help', 'lign-left', passOk()]">
                      {{ passCheck }}
                    </p>
                  </div>

                  <div class="field  level">
                    <div class="level-item has-text-centered ">
                      <input v-model="user.remember" type="checkbox">
                      <label class="checkbox is-size-7 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div class="field ">
                    <p class="control">
                      <button
                        :class="[
                          'button',
                          'is-block',
                          'warna-tema',
                          'is-small',
                          'is-fullwidth',
                          loading,
                          'is-rounded'
                        ]"
                        :disabled="disable"
                        @click.prevent="submitForm"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </client-only>
          </form>
        </div>
        <hr>
        <div class="forgot-password ">
          <p class="has-text-centered has-text-small">
            Did you
            <router-link
              class="is-small"
              :to="{ path: '/forgot' }"
            >
              forgot your password
            </router-link>
            or
            <router-link
              :to="{ path: '/signup' }"
            >
              need an account?
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import fungsi login dari auth_service
import * as auth from '@/assets/services/auth_service'
// import denger from "../../echo";
export default {
  name: 'Login',
  data () {
    return {
      // data user
      user: {
        email: '',
        password: '',
        remember: false
      },
      errors: {}, // belum dipakai, ga tau fungsinya juga sih
      disable: false, // disable/enable button login
      classDanger: '', // class valisdasi email
      visClass: 'hidden', // validasi email
      validMail: '', // validasi email
      // untuk ngecek email
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      visPass: 'hidden', // validasi password (class nya, merubah sedikit css nya)
      passCheck: '', // validasi password
      validPass: '', // validasi passsword
      Vmail: false, // boolean email sudah valid atau belum, jika sudah valid bisa masuk proses selanjutnya
      Vpass: false, // boolean password sudah valid atau belum, idem yang atas
      loading: '', // kelas loading button
      mailMessage: 'none', // return mail error 401
      mail: ''
    }
  },
  computed: {
    // check isi vuex, sedang login atau tidak
    logged () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    // fungsi ridirect sesuai role
    findRole (item) {
      // redirect pake { name: "link"} biar ga panjang gini nulisnya
      // {path:"/home/produksi"}
      const url = this.$store.getters.serverUrl // server url, tempatnya admin sama root
      // switch item berisi role yang dipaggil oleh fungsi submitForm
      switch (item) {
        case 'Produksi':
          this.$router.push({ name: 'produksi' }, () => {})
          this.flashMessage.success({
            message: 'Anda login sebagai ' + item + ' Capcin',
            time: 3000
          })
          location.reload()
          break
        case 'Packing':
          this.$router.push({ name: 'packing' }, () => {})
          this.flashMessage.success({
            message: 'Anda login sebagai ' + item + ' Capcin',
            time: 3000
          })
          location.reload()
          break
        case 'Supplier':
          this.$router.push({ name: 'supplier' }, () => {})
          this.flashMessage.success({
            message: 'Anda login sebagai ' + item + ' Capcin',
            time: 3000
          })
          location.reload()
          break
        case 'Mitra':
          this.$router.push({ name: 'mitra' }, () => {})
          this.flashMessage.success({
            message: 'Anda login sebagai ' + item + ' Capcin',
            time: 3000
          })
          location.reload()
          break
        case 'Admin':
          this.disable = true // disable button login
          this.loading = 'is-loading' // enable button spinner
          // jika yang login role nya  Admin, maka logout
          this.$store
            .dispatch('destroyToken')
            .then(
              this.flashMessage.success({
                message:
                  'Anda Login sebagai ' +
                  item +
                  ' dan akan diarahkan ke halaman Desktop, mohon tunggu sebentar',
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: 'login' },
                () => {}
              )
            )
            .catch(
              this.flashMessage.success({
                message:
                  'Anda Login sebagai ' +
                  item +
                  ' dan akan diarahkan ke halaman Desktop, mohon tunggu sebentar',
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: 'login' },
                () => {}
              )
            )
          // dan arahkan ke halama server
          setTimeout(function () {
            this.loading = ''
            window.location = url
            this.disable = false
          }, 5000)

          break
        case 'Root':
          this.disable = true // disable button login
          this.loading = 'is-loading' // enable button spinner
          // jika yang login role Root, maka logout
          this.$store
            .dispatch('destroyToken')
            .then(
              this.flashMessage.success({
                message:
                  'Anda Login sebagai ' +
                  item +
                  ' dan akan diarahkan ke halaman Desktop, mohon tunggu sebentar',
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: 'login' },
                () => {}
              )
            )
            .catch(
              this.flashMessage.success({
                message:
                  'Anda Login sebagai ' +
                  item +
                  ' dan akan diarahkan ke halaman Desktop, mohon tunggu sebentar',
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: 'login' },
                () => {}
              )
            )
          // dan arahkan ke halama server
          setTimeout(function () {
            this.loading = ''
            window.location = url
            this.disable = false
          }, 5000)

          break
        default:
          this.disable = true // disable button login
          this.loading = 'is-loading' // enable button spinner
          // jika yang login role nya bukan 4 diatas atau admin atau root, maka logout
          this.$store
            .dispatch('destroyToken')
            .then(
              this.flashMessage.success({
                message:
                  'Mohon maaf Anda tidak diijinkan untuk login, silahkan hubungi Admin ' +
                  item,
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: 'login' },
                () => {}
              )
            )
            .catch(
              this.flashMessage.success({
                message:
                  'Mohon maaf Anda tidak diijinkan untuk login, silahkan hubungi Admin ' +
                  item,
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: 'login' },
                () => {}
              )
            )

          break
      }
    },

    async submitForm () {
      // shortcut untuk this
      // const vm = this;
      // jika email dan password sudah di validai
      if (this.Vpass == true && this.Vmail == true) {
        this.loading = 'is-loading' // button spinner on
        this.disable = true // disable button
        try {
          const response = await auth.login(this.user) // paggil fungsi login dari auth dengan membawa data user
          this.loading = '' // button spinner off
          this.disable = false // button enable
          this.errors = {} // sepertinya belum berfungsi membesihkan error dengan baik dan benar
          this.findRole(response.token_scope) // panggil fungsi redirect sesuai role
          // setTimeout(function() {
          //   denger;
          //   // listen to laravel Echo
          //   let userId = auth.getUserId();
          //   // eslint-disable-next-line no-undef
          //   Echo.private("App.User." + userId).notification(data => {
          //     this.$store.commit("setNotification", data);
          //     this.$store.commit("order/setOrderFocus", data);
          //   });
          //   this.$store.dispatch("notifications/getNotifications");
          // }, 8000);
        } catch (error) {
          // console.log(error);
          this.disable = false // button enable
          this.loading = '' // loading spinner off
          if (error.response != undefined) {
            this.user.password = '' // kosongkan input password
            // pilih pesan error sesuai respon server
            switch (error.response.status) {
              case 422:
                this.errors = error.response.data.errors
                break
              case 500:
                this.flashMessage.error({
                  message: error.response.data.message,
                  time: 5000
                })
                break
              case 401:
                this.classDanger = 'is-danger'
                this.mailMessage = 'inherit'
                this.mail = 'Do you use the registered email address?'
                this.flashMessage.error({
                  message: error.response.data.message,
                  time: 5000
                })
                break
              case 404:
                this.flashMessage.error({
                  message: error.response.data.message,
                  time: 5000
                })
                break
              default:
                this.flashMessage.error({
                  message: 'Some error occured, Please Try Again!',
                  time: 5000
                })
                break
            }
          } else {
            this.flashMessage.error({
              tittle: 'Some error occured, Please Try Again!',
              message: error,
              time: 5000
            })
          }
        }
      } else {
        // ini seharusnya hanya terjadi jika formnya kosong
        this.flashMessage.error({
          message: 'Oops..., did you forget to fill the form?',
          time: 4000
        })
      }
    },
    //= ===================== ngisi pesan aja ===============
    mailString (kelas, visib, pesan, pass) {
      const vm = this
      vm.classDanger = kelas
      vm.visClass = visib
      vm.validMail = pesan
      vm.Vmail = pass
    },
    passString (kelas, visib, pesan, pass) {
      const vm = this
      vm.validPass = kelas
      vm.visPass = visib
      vm.passCheck = pesan
      vm.Vpass = pass
    },
    //= ================ validasi email =====================
    formValidation () {
      const vm = this
      if (vm.user.email != '') {
        if (vm.reg.test(vm.user.email) == false) {
          vm.mailString('is-danger', 'visible', 'Check your email', false)
        } else if (vm.reg.test(vm.user.email) == true) {
          vm.mailString('is-success', 'hidden', '', true)
        }
      } else {
        vm.mailString('', 'hidden', '', false)
      }
      // return vm.classDanger;
    },
    //= ================== validasi Password ==================
    passOk () {
      const vm = this
      if (vm.user.email != '' && vm.validMail == '' && vm.user.password != '') {
        if (vm.user.password.length <= 5) {
          vm.passString(
            'is-danger',
            'hidden',
            'your password less than 6 caracter',
            false
          )
        } else {
          vm.passString('is-success', 'visible', '', true)
        }
      } else if (vm.user.password != '' && vm.user.email == '') {
        vm.passString('is-danger', 'hidden', 'Your email is empty', false)
      } else if (vm.user.password != '' && vm.validMail != '') {
        vm.passString('is-danger', 'hidden', 'Your email is not valid', false)
      } else if (vm.user.password == '' && vm.user.email != '') {
        vm.passString('is-warning', 'hidden', 'Password is empty', false)
      } else {
        vm.passString('', 'hidden', '', false)
      }
      return vm.validPass
    }
  },
  head () {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'login',
          content: 'login to continue'
        }
      ]
    }
  }
}
</script>
<style scoped>
#log {
  padding-bottom: 10px;
}
</style>
