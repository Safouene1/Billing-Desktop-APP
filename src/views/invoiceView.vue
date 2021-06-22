<template>
  <div>

    <div v-show="currentInvoice" class="container">

      <div id="invoiceholder">


        <div class="d-grid    py-3 buton mt-5 d-md-flex ">
          <div class=" px-5 justify-content-start">
            <h6 :class="{ pending : currentInvoice.invoicePending, paid : currentInvoice.invoicePaid  }"
                class=" py-2 px-5 text-white rounded-pill"
                type="button ">
              {{ Status }}</h6>

          </div>
          <div class="justify-content-end">
            <button class="btn btn-outline-primary btn-md mx-2 " type="button" @click="toggleEditInvoice">

              <svg class="bi bi-pencil-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
              Modifier
            </button>
            <button class="btn btn-outline-warning btn-md mx-2" type="button" @click="print()">
              <svg class="bi bi-printer-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                <path
                    d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
              </svg>

              Imprimer
            </button>
            <button class="btn btn-outline-danger btn-md mx-2 " type="button">

              <svg class="bi bi-trash-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
              Supprimer
            </button>

          </div>

        </div>
        <div id="headerimage">

        </div>

        <div id="invoice">

          <div id="invoice-top">
            <div class="logo">
              <img alt="logo" height="90" src="//s3.imgcdn.dev/nvbvu.png"

              />

            </div>
            <div class="info">

            </div><!--End Info-->
            <div class="title">
              <h1 class="orthocolor">Facture </h1>
              <p>#{{ currentInvoice.invoiceId }}<br/>

              </p>
            </div><!--End Title-->
          </div><!--End InvoiceTop-->


          <div id="invoice-mid">

            <div class="info">
              <h2>Docteur : </h2>
              <h2 class="mt-2 client">{{ currentInvoice.clientName }}</h2>
              <p class="mt-1">{{ currentInvoice.clientEmail }}<br/>
              </p>
            </div>

            <div id="project">
              <h2>Détails Facture : </h2>
              <p class="mt-1"><b>Total</b> : {{ currentInvoice.prixTotal }} TND </p>
              <p class="mt-1"><b>Date :</b> {{ currentInvoice.invoiceDate }}</p>
            </div>

          </div><!--End Invoice Mid-->

          <div id="invoice-bot">

            <div id="table">
              <table>
                <tr class="tabletitle">
                  <td class="hours"><h2>Patient </h2></td>
                  <td class="item"><h2>Désignation</h2></td>

                  <td class="subtotal"><h2>Sub-total</h2></td>
                </tr>

                <tr v-for="(item , index) in currentInvoice.items  " :key="index" class="service">
                  <td class="tableitem"><p class="itemtext">{{ item.name }}</p></td>
                  <td class="tableitem"><p class="itemtext">{{ item.description }}</p></td>

                  <td class="tableitem"><p class="itemtext">{{ item.price }}</p></td>
                </tr>


                <tr class="tabletitle">
                  <td></td>

                  <td class="Rate"><h2>Total</h2></td>
                  <td class="payment"><h2>{{ currentInvoice.prixTotal }} TND</h2></td>
                </tr>

              </table>
            </div><!--End Table-->

            <div class="sign mx-4 mt-5">
              <h4>Turki Sirine</h4>
              <div class="line"></div>
            </div>


            <div id="legalcopy">
              <p class="legal "><strong>orthodonticalab@gmail.com</strong> <br/><br/>
                <span class="my-5 py-5">+216 29 29 26 90</span>
              </p>
            </div>

          </div><!--End InvoiceBot-->
        </div><!--End Invoice-->

      </div><!-- End Invoice Holder-->


    </div>

  </div>
</template>

<script>

import {mapMutations, mapState} from "vuex";

export default {
  name: "invoiceView",
  components: {},
  data() {
    return {
      currentInvoice: null,
    }
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_EDIT_INVOICE']),
    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },
    async print() {
      await this.$htmlToPaper('invoice', {


        name: 'facture',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
          'scrollbars=yes'
        ],
        styles: [
          "../src/styles/pdf.css"
        ],
        timeout: 1000, // default timeout before the print window appears
        autoClose: true, // if false, the window will not close after printing
        windowTitle: window.document.title, // override the window title


      });
    }
  },
  mounted() {

  },

  computed: {
    ...mapState(['currentInvoiceArray']),
    Status() {
      if (this.currentInvoice.invoicePending) {
        return "En Attente"
      }
      return "payé"
    },
  }
}
</script>

<style scoped>

* {
  margin: 0;
  box-sizing: border-box;

}

body {
  background: #E0E0E0;


  background-repeat: repeat-y;
  background-size: 100%;
}

::selection {
  background: #f31544;
  color: #FFF;
}

h1 {
  font-size: 1.5em;
  color: #222;
}

h2 {
  font-size: .9em;
}

h3 {
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}

.buton {

  margin: 0 auto;
  width: 800px;
  background-color: #141415;
  padding: 15px;
}

p {
  font-size: .7em;
  color: #666;
  line-height: 1.2em;
}

#invoiceholder {
  width: 100%;
  hieght: 100%;
  padding-top: 50px;
}

.line {
  width: 142px;
  height: 10px;
  border-bottom: 1px solid #ba7a92;
  position: absolute;
}

#headerimage {
  z-index: -1;
  position: relative;
  top: -50px;
  height: 350px;


  -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, .15), inset 0 -2px 4px rgba(0, 0, 0, .15);
  -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, .15), inset 0 -2px 4px rgba(0, 0, 0, .15);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, .15), inset 0 -2px 4px rgba(0, 0, 0, .15);
  overflow: hidden;
  background-attachment: fixed;
  background-size: 1920px 80%;
  background-position: 50% -90%;
}

#invoice {
  position: relative;
  top: -290px;
  margin: 0 auto;
  width: 800px;
  background: #FFF;
}

[id*='invoice-'] { /* Targets all id with 'col-' */
  border-bottom: 1px solid #ba7a92;
  padding: 30px;
}

#invoice-top {
  min-height: 120px;
}

#invoice-mid {
  min-height: 120px;
}

#invoice-bot {
  min-height: 250px;
}

.logo {
  float: left;
  height: 70px;
  width: 160px;

  background-size: 160px 70px;
}

.client {
  font-size: 19px;
}

.info {

  float: left;
  margin-left: 20px;
}

.title {
  float: right;
}

.title p {
  text-align: right;
}

#project {
  margin-left: 52%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.orthocolor {
  color: #ba7a92;
}

td {
  padding: 5px 0 5px 15px;
  border: 1px solid #EEE
}

.tabletitle {
  padding: 5px;
  background: #EEE;
}

.service {
  border: 1px solid #EEE;
}

.item {
  width: 50%;
}

.itemtext {
  font-size: .9em;
}

#legalcopy {
  margin-top: 30px;
}

.sign {
  float: right;
  margin-top: 30px;
  text-align: right;
}


.legal {
  width: 30%;
}

.pending {

  border: 2px solid #FF6900;

}

.pending:hover {
  background-color: #FF6900;
}

.paid {
  border: 2px solid #11A200;
}

.paid:hover {
  background-color: #11A200;
}


</style>