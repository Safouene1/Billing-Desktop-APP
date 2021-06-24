<template>

  <div class="container-fluid ">
    <div v-if="mobile" class="row">
      <the-navbar/>
      <div ref="invoiceWrap" class="col-sm  min-vh-100">
        <router-view/>
      </div>
    </div>
    <div v-else>
      <mobile-error/>
    </div>
  </div>

</template>

<script>
import TheNavbar from "./components/theNavbar";
import MobileError from "./components/mobileError";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  data(){
    return{
      mobile: true,
    }
  },
  components: {

    MobileError, TheNavbar
  },

  created(){
    this.GET_INVOICES();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods : {
    ...mapActions(['GET_INVOICES']),
    ...mapMutations(['TOGGLE_MODAL']),

    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = false;
      } else this.mobile = true;
    }
  },
  computed: {
    ...mapState(['invoiceModal', 'warningModal']),

  }


}


</script>








<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;1,900&display=swap");
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet");
* {
  font-family: "Poppins", sans-serif;

}
html , body {
  height: 100%;
  width: 100%;
  background-color: #121212 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

button:focus {
  outline: none !important;
  outline-offset: 0 !important;
}

a {
  color: #e4e6eb;
  text-decoration: none;

}

a:hover {
  color: white;
}
</style>
