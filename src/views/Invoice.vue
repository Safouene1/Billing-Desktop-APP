<template>
  <div class="home ">
    <div class="container-fluid content ">
      <div class=" float-start mt-4 flex-column ">
        <h1 class="fac"> Factures </h1>
        <p class="py-1 px-2"> {{ number }} factures </p>
      </div>
      <div class=" float-end mt-5 btn ftr rounded-pill">

        <div class="row">
          <div class="col-7">

            <button class="rounded-pill btn nvfacture btn-primary  align-items-center" @click="newInvoice" v-if="!invoiceModal">
              <svg class="bi bi-plus-circle-fill px-1" fill="currentColor" height="30" viewBox="0 0 16 16"
                   width="30" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
              </svg>
              Nouvelle Facture
            </button>
            <button v-else class="rounded-pill btn nvfacture disabled btn-outline-primary  align-items-center">

              Creation du facture...
            </button>
          </div>
          <div class="col-5 ">
            <button id="dropdownMenuLink" aria-expanded="false" class="btn ftr py-2 rounded-pill  px-4 dropdown-toggle"
                    data-bs-toggle="dropdown" type="button" @click="toggleFilter">
              <svg class=" px-1 bi bi-funnel-fill" fill="currentColor" height="30" viewBox="0 0 16 16"
                   width="30" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
              </svg>
              Filtre par:
            </button>
            <ul v-show="filtermenu" class=" drop rounded px-6 mx-3 my-2">
              <li><a class="dropdown-item" href="#">Brouillon</a></li>

              <li><a class="dropdown-item" href="#">En Attente</a></li>
              <li><a class="dropdown-item" href="#">Payé</a></li>
              <li><a class="dropdown-item" href="#">Effacer filtre</a></li>

            </ul>
          </div>
        </div>

      </div>
    </div>
    <transition name="fade">
      <invoice-modal v-show="invoiceModal"/>
    </transition>


  </div>
</template>

<script>


import InvoiceModal from "../components/invoiceModal";
import {mapMutations} from "vuex";
import {mapState} from "vuex"

export default {
  name: 'Home',
  components: {
    InvoiceModal,

  },
  data(){
    return{
      number:6
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    toggleFilter() {
      this.filtermenu = !this.filtermenu;
    },
    newInvoice() {
      this.TOGGLE_INVOICE();
    }

  },
  computed: {
    ...mapState(['invoiceModal'])
  }
};
</script>
<style    scoped>


.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {

  opacity: 0;
}

.fac {
  font-weight: bold;
}

p {
  font-size: 15px;
}

.btn, .content {
color: #e4e6eb;
}

.ftr:hover {
color: #0275db;
}

.nvfacture:hover {
color: #18191a;
}

.dropdown-item {
color: white;
margin-top: 5px;
}

.dropdown-item:hover, .dropdown-item:focus {
background-color: #15202B;
color: #e4e6eb;
}

li {
list-style: none;
font-size: 15px;
}

.drop {
background-color: #141415;
padding: 15px 5px;
}




</style>