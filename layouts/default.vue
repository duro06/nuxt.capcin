<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang='scss'>
.syarat {
  margin: 10px;
  background-color: whitesmoke;
  .progress {
    margin-bottom: 2px;
    height: 6px;
  }
}
.ngisi {
  padding: 5px 20px 60px 20px;
}
.kepala {
  background-color: rgba(229, 226, 226, 0.747);
  border-radius: 1px;
  padding-left: 10px;
}
.batas-kotak {
  box-shadow: 0 0 0 1px lightgray;
}
.isinya-kartu {
  background-color: whitesmoke;
  border-radius: 1px;
  box-shadow: 0 0 0 1px lightgray;
}
.kaki-kartu {
  background-color: rgba(224, 223, 223, 0.733);
  border-radius: 1px;
  height: 20px;
  align-self: center;
}
.custom_bottom_nav {
  padding: 2px 5px;
}
.content-body {
  padding: 10px;
  box-shadow: 0 2px 0 0 whitesmoke;
}
.rata-kanan {
  text-align: right;
}
.rata-kiri {
  text-align: left;
}
.rata-tengah {
  text-align: center;
}
.link-color {
  color: #ee1846;
}
.judul-component {
  text-align: left;
  padding: 5px;
  font-size: 14px;
}
.VueCarousel-wrapper {
  border-radius: 10px;
}
// khusus button footer nav
.btn_nav_item a {
  color: #636e72;
}
.btn_nav_item.active a {
  color: #42b549 !important;
}
.hijau {
  color: #42b549 !important;
}
.btn_nav_item.active p {
  color: hsl(124, 47%, 48%) !important;
}
.warna-tema {
  color: white !important;
  background-color: #42b549 !important;
}
// kelas loading
.vld-icon {
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
// Animmasi transition

@-webkit-keyframes slideInLeft {
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInLeft {
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInLeft {
  -webkit-animation-name: slideInLeft;
  animation-name: slideInLeft;
}
</style>
