<template>
  <!-- warning modal --->
  <div v-if="warning" class="container mt-4">
    <div id="demo">

      <div class="warning-dialog">
        <div class="warning-content   ">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="text-white">
              <svg class="bi bi-exclamation-lg" fill="currentColor" height="20" viewBox="0 0 16 16" width="20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"/>
              </svg>
              Attention
            </h4>
            <button class=" btn btn-secondary" type="button" @click="toggleWarning">
              <svg class="bi bi-x-circle-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body mb-2">êtes-vous sûr de vouloir quitter? <br/> vos modifications ne seront pas
            enregistrées
            <div class="py-2">
              <button class="btn btn-secondary  mx-3" type="button" @click="toggleWarning">Retour</button>
              <button class="btn btn-danger" type="button" @click="closeInvoice">Oui , Fermer</button>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>

  <!-- warning modal end --->

  <div>

    <div class="modal-dialog  modal-dialog-scrollable">

      <div class="modal-content">
        <div class="modal-header px-5">
          <h5 v-if="editInvoice" class="modal-title">Modifier Facture</h5>
          <h5 v-else class="modal-title">Nouvelle Facture</h5>
          <button class="btn-close btn-close-white" type="button" @click="toggleWarning"></button>
        </div>

        <form class="modal-body" @submit.prevent="submitForm">

          <p>Details Docteur</p>
          <div class="mb-3">
            <label class="form-label float-start" for="clientName">Nom et prénom *</label>
            <input id="clientName" v-model="clientName" class="form-control" placeholder="foulen fouleni" required
                   type="text">
          </div>
          <div class="mb-3">
            <label class="form-label float-start" for="clientEmail">Email </label>
            <input id="clientEmail" v-model="clientEmail" class="form-control" placeholder="foulen@gmail.com"
                   required>
          </div>


          <label class="form-label" for="basic-url">Details Facture</label>
          <div class="input-group mb-3">
            <span id="basic-addon3" class="input-group-text">Date *</span>
            <input id="basic-url" v-model="invoiceDate" aria-describedby="basic-addon3" class="form-control" required
                   type="date">
          </div>


          <p> Liste des articles </p>

          <table class="table table-dark table-striped">
            <thead>
            <tr>
              <th scope="col">Nom du Patient</th>
              <th colspan="2" scope="col">Designation</th>
              <th scope="col">Prix en TND</th>
              <th>
                <svg class="bi bi-trash-fill" fill="currentColor" height="16" viewBox="0 0 16 16"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </th>
            </tr>
            </thead>
            <tbody>

            <tr v-for=" item in items" :key="item.id">
              <td><input v-model="item.name" class="input-group-text" type="text"/></td>
              <td colspan="2"><textarea v-model="item.description" class="input-group-text" cols="30" rows="1"
                                        type="text"/></td>
              <td><input v-model="item.price" class="input-group-text" min="0" type="number"/></td>
              <td @click="deleteItem(item.id)">
                <svg class="bi bi-trash-fill" fill="currentColor" height="16" viewBox="0 0 16 16"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </td>
            </tr>

            </tbody>
          </table>
          <button class="btn btn-dark rounded-pill " type="button" @click="addNewItems">
            <svg class="px-2 bi bi-plus-lg" fill="currentColor" height="30" viewBox="0 0 16 16"
                 width="30" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
            </svg>
            Ajouter un Article
          </button>
          <div class="row">
            <p v-if="isDisabled" class="mt-4 "> Prix Total : <input v-model="prixTotal" :disabled="isDisabled"
                                                                    class="  btn btn-dark rounded-pill input-group-text rounded-pill"
                                                                    type="number">
              <button class="btn btn-dark mx-3" type="button" @click="isDisabled=!isDisabled">
                <svg class="bi bi-pencil-square" fill="currentColor" height="16" viewBox="0 0 16 16"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      fill-rule="evenodd"/>
                </svg>
              </button>
            </p>
            <p v-else class="mt-4 "> Prix Total : <input v-model="prixInvoice" :disabled="isDisabled"
                                                         class="  btn btn-dark  btn-outline-primary rounded-pill input-group-text rounded-pill"
                                                         type="number">
              <button class="btn  btn-dark mx-3" type="button" @click="isDisabled=!isDisabled">
                <svg class="bi bi-check-square" fill="currentColor" height="16" viewBox="0 0 16 16"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path
                      d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                </svg>
              </button>
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" @click="toggleWarning">Fermer</button>

            <button v-if="!loading" class="btn btn-primary" type="submit" @click="saveInvoice">Sauvagarder</button>
            <button v-else class="btn btn-primary" disabled type="button">
              <span aria-hidden="true" class="spinner-grow  spinner-grow-sm" role="status"></span>
              Loading ...
            </button>

          </div>


        </form>

      </div>


    </div>
  </div>
</template>

<script>

import db from "../firebase/firebaseinit"
import {mapActions, mapMutations, mapState} from "vuex";
import {uid} from "uid";

export default {
  name: "invoiceModal",

  data() {
    return {
      invoiceId: uid(6),
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      invoiceDate: this.invoiceDate,
      invoicePending: this.invoicePending,
      invoicePaid: null,
      prixInvoice: 0,
      docId: null,
      loading: false,
      items: [],
      isDisabled: true,
      warning: null,
    }
  },
  computed: {
    ...mapState(['editInvoice', 'currentInvoiceArray']),
    prixTotal() {
      let prixTotal = 0;
      if (this.isDisabled) {

        let items = this.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].price < 0) {
            items[i].price = 0;
          }
          prixTotal += parseFloat(items[i].price);
        }
      } else {
        prixTotal = parseFloat(this.prixInvoice);
      }
      return prixTotal;


    }

  },

  methods: {
    ...mapActions(['UPDATE_INVOICE', 'GET_INVOICES']),
    ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_INVOICE', 'TOGGLE_EDIT_INVOICE']),
    closeInvoice() {
      this.toggleWarning();
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
    },
    toggleWarning() {
      this.warning = !this.warning;
    },

    addNewItems() {
      this.items.push({
        id: uid(),
        name: '',
        description: '',
        price: 0
      })
    },
    deleteItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    saveInvoice() {
      this.invoicePending = true;


    },
    async uploadInvoice() {

      this.loading = true;
      const dataBase = db.collection('invoices').doc();
      await dataBase.set({
        invoiceId: uid(6),
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        invoiceDate: this.invoiceDate,
        invoicePending: this.invoicePending,
        invoicePaid: this.invoicePaid,
        items: this.items,
        prixTotal: this.prixTotal,
      })
      this.loading = false;
      this.TOGGLE_INVOICE();
      this.GET_INVOICES();
    },
    async updateInvoice() {

      this.loading = true;
      const dataBase = db.collection('invoices').doc(this.docId);
      await dataBase.update({
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        invoiceDate: this.invoiceDate,
        items: this.items,
        prixTotal: this.prixTotal,
      })
      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId,
      };

      this.UPDATE_INVOICE(data);

    },
    submitForm() {
      if (this.editInvoice) {
        this.updateInvoice();
      } else {

        this.uploadInvoice();

      }


    }
  },
  created() {
    if (this.editInvoice) {
      this.docId = this.currentInvoiceArray[0].docId,
          this.invoiceId = this.currentInvoiceArray[0].invoiceId,
          this.clientName = this.currentInvoiceArray[0].clientName,
          this.clientEmail = this.currentInvoiceArray[0].clientEmail,
          this.invoiceDate = this.currentInvoiceArray[0].invoiceDate,
          this.prixInvoice = this.currentInvoiceArray[0].prixInvoice,
          this.items = this.currentInvoiceArray[0].items,
          this.prixTotal = this.currentInvoiceArray[0].prixTotal
    }
  }


}

</script>

<style scoped>
.modal-title {
  color: #0275db;
}


.modal-dialog, .modal-content {
  color: #e4e6eb;
  background-color: #141415;
  border: none;
  position: fixed;
  z-index: 60; /* Sit on top */
  left: 5rem;
  top: 0;
  width: 70%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}

.warning-content {
  color: #e4e6eb;
  position: fixed;
  top: 30%;
  width: 50%;

  background-color: #15202B;
  z-index: 10000000000;

}

.btn-do {
  background-color: #570108;
  color: white;

}

.form-control {
  background-color: #242526;
  color: #e4e6eb;
  border: none;
}

.input-group-text {
  background-color: #141415;
  color: #e4e6eb;
  border-color: #3a3b3c;
}

.input-group {
  border-color: #141415;
}
</style>