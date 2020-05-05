import jwt from 'jsonwebtoken'
// import store from "../store";

export function write (isi) {
  // const pesan = store.state.notification;
  const pesan = isi
  const coba = jwt.sign(
    { message: pesan },
    'Pala64564ha@sakuranandaniyu99865773838'
  )
  // console.log(coba);
  localStorage.setItem('coba', coba)
}

export function read () {
  const coba = localStorage.getItem('coba')
  if (coba) {
    const message = jwt.decode(coba)
    localStorage.removeItem('coba')
    return message.message
  } else {
    return 'tidak ada data'
  }
}
