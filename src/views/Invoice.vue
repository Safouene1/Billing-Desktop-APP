<template>
  <div class="home">

    <div class="container-fluid content ">
      <div class="  mt-4 flex-column align-items-start">
        <h1 class="fac"> Factures </h1>
        <p class="py-1 px-2"> {{ invoiceData.length }} factures </p>
      </div>

      <div>
        <div class=" align-items-left mt-2 btn ftr rounded-pill">
          <div class="row">
            <div class="col-7">
              <button v-if="!invoiceModal" class="rounded-pill btn nvfacture btn-primary  align-items-center"
                      @click="newInvoice">
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
              <button
                  class="btn ftr py-2  px-4 dropdown-toggle"
                  type="button" @click="toggleFilter">
                <svg class=" px-1 bi bi-funnel-fill" fill="currentColor" height="30" viewBox="0 0 16 16"
                     width="30" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                </svg>
                Filtre par: <span>{{ filteredInvoice }}</span>
              </button>
              <ul v-show="filtermenu" class="col-2 drop rounded  mx-3 my-2">
                <li :class="{activeFilter : filteredInvoice=='En Attente'} " class="dropdown-item"
                    @click="filteredInvoices">En Attente
                </li>
                <li :class="{activeFilter : filteredInvoice=='Payé'} " class="dropdown-item" @click="filteredInvoices">
                  Payé
                </li>
                <li class="dropdown-item" @click="filteredInvoices">Effacer Filtres</li>

              </ul>
            </div>
          </div>


        </div>
        <div v-if="invoiceData.length < 0">
          <no-data/>
        </div>
        <div v-else>
          <div class="main-wrapper bar mt-5">
            <div class="container main-container">
              <div class="row main-row">
                <div class="col-12 align-center">
                  <div class="row p-3">
                    <div class="col-2 align-middle">
                      #
                    </div>
                    <div class="col-2 align-middle">
                      Date
                    </div>
                    <div class="col-2 align-middle ">
                      Client
                    </div>
                    <div class="col-2 align-middle">
                      Total
                    </div>
                    <div class="col-2 align-middle">
                      <p class="bg-dark p-1 p" type="button">Status</p>
                    </div>
                    <div class="col-2 align-middle">


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <invoices-list v-for="(invoice , index) in filteredData" :key="index" :invoice="invoice"/>
        </div>
      </div>

    </div>

    <invoice-modal v-if="invoiceModal" :key="index"/>


  </div>


</template>

<script>


import InvoiceModal from "../components/invoiceModal";
import {mapMutations, mapState} from "vuex";

import InvoicesList from "../components/invoicesList";
import NoData from "../components/noData";

export default {
  name: 'Home',
  components: {
    NoData,
    InvoicesList,

    InvoiceModal,

  },
  data() {
    return {

      filtermenu: null,

      filteredInvoice: null,
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    toggleFilter() {
      this.filtermenu = !this.filtermenu;
    },
    filteredInvoices(e) {
      if (e.target.innerText === 'Effacer Filtres') {
        this.filteredInvoice = null;

        this.toggleFilter();
        return;
      }
      this.toggleFilter();
      return this.filteredInvoice = e.target.innerText;

    },
    newInvoice() {
      this.TOGGLE_INVOICE();
    },


  },
  computed: {
    ...mapState(['invoiceModal', 'invoiceData', 'invoicesLoaded']),
    filteredData() {
      return this.invoiceData.filter(invoice => {
        if (this.filteredInvoice === "En Attente") {
          return invoice.invoicePending === true;
        } else if (this.filteredInvoice === "Payé") {
          return invoice.invoicePaid === true;
        }
        return invoice;
      })
    }
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
  color: #3a3b3c;
}

.dropdown-item {
  color: white;
  padding: 10px;
  margin-top: 10px;
}

.dropdown-item:hover, .dropdown-item:focus {
  background-color: #3a3b3c;
  color: #e4e6eb;
}

li {
  list-style: none;
  font-size: 15px;
}

.drop {
  position: absolute;
  z-index: 1;
  background-color: #141415;
  opacity: 80%;
  padding: 15px 5px;

}

.activeFilter {
  background-color: #FFC68A;
  color: #18191a;
}

.bar {
  font-weight: bold;
  background-color: #18191a;
  color: #e4e6eb;


}





</style>