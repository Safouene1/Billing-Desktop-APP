<template>

  <div ref="invoiceWrap" class="mod " @click="checkClick">

    <div class="modal-dialog  modal-dialog-scrollable">

      <div class="modal-content ">
        <div class="modal-header px-5">

          <h5 class="modal-title">Nouvelle Facture</h5>
          <button class="btn-close btn-close-white" type="button" @click="closeInvoice"></button>
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
              <th scope="col">Nom du Client</th>
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
            <button class="btn btn-secondary" type="button" @click="closeInvoice">Fermer</button>

            <button v-if="!loading" class="btn btn-dark" type="submit" @click="saveInvoice">Sauvagarder</button>
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
import {mapMutations} from "vuex";
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
      invoicePaid: this.invoicePaid,
      prixInvoice: 0,
      loading: false,
      items: [],
      isDisabled: true,
    }
  },
  computed: {
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
    ...mapMutations(['TOGGLE_INVOICE']),
    closeInvoice() {
      this.TOGGLE_INVOICE();
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
        invoicePaid: null,
        items: this.items,
        prixTotal: this.prixTotal,
      })
      this.loading = false;
      this.TOGGLE_INVOICE();
    },
    submitForm() {
      this.uploadInvoice();

    }
  },


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
  left: 10%;
  top: 0;
  width: 70%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
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