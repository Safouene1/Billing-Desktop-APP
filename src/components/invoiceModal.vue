<template>
  <div ref="invoiceWrap" class="mod " @click="checkClick">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content ">
        <div class="modal-header px-5">
          <h5 class="modal-title">Nouvelle Facture</h5>
          <button class="btn-close btn-close-white" type="button" @click="closeInvoice"></button>
        </div>
        <form class="modal-body" @submit.prevent="submitForm">

          <p>Details Docteur</p>
          <div class="mb-3">
            <label class="form-label float-start" for="nomClient">Nom et prénom</label>
            <input id="nomClient" v-model="clientName" class="form-control" placeholder="foulen fouleni" required
                   type="text">
          </div>
          <div class="mb-3">
            <label class="form-label float-start" for="emailClient">Email </label>
            <input id="emailClient" v-model="clientEmail" class="form-control" placeholder="foulen@gmail.com"
                   type="email">
          </div>


          <label class="form-label" for="basic-url">Details Facture</label>
          <div class="input-group mb-3">
            <span id="basic-addon3" class="input-group-text">Date</span>
            <input id="basic-url" v-model="invoiceDate" aria-describedby="basic-addon3" class="form-control"
                   type="date">
          </div>


          <p> Liste des articles </p>

          <table class="table table-dark table-striped">
            <thead>
            <tr>
              <th scope="col">Nom du Client</th>
              <th colspan="2" scope="col">Designation</th>
              <th scope="col">Prix en TND</th>
              <th> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for=" item in items" :key="item.id">
              <td> <input type="text" class="input-group-text" v-model="item.name"/></td>
              <td colspan="2">  <textarea rows="1" cols="30" type="text" class="input-group-text" v-model="item.description"/></td>
              <td><input type="number"   min="0" class="input-group-text" v-model="item.price"/></td>
              <td @click="deleteItem(item.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg></td>
            </tr>

            </tbody>
          </table>
          <button class="btn btn-dark rounded-pill " @click="addNewItems">
            <svg class="px-2 bi bi-plus-lg" fill="currentColor" height="30" viewBox="0 0 16 16"
                 width="30" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
            </svg>
            Ajouter un Article
          </button>
          <div class="row">
            <p class="mt-4 "> Prix Total : <input type="number" :disabled="isDisabled" class="  btn btn-dark rounded-pill input-group-text rounded-pill" v-model="prixTotal">
            <button @click="isDisabled=!isDisabled" class="btn btn-dark mx-3">
              <svg  v-if="isDisabled"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
              <svg  v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
              </svg>
            </button>

            </p>

          </div>

        </form>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal" type="button" @click="closeInvoice">Fermer</button>
          <button type="submit" class="btn btn-dark"  @click="saveInvoice">Sauvagarder</button>
          <button class="btn btn-primary" type="button" @click="printInvoice">Creer (PDF)</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
 import {uid} from "uid";
export default {
  name: "invoiceModal",
  data() {
    return {

      clientName: null,
      clientEmail: null,
      invoiceDate: null,
      invoicePending: null,
      invoiceDraft: null,
      invoicePaid: null,
      invoiceDateUnix: null ,

      items: [

      ],
      isDisabled: true,

    }
  },
  computed: {
    prixTotal() {
      var items = this.items;
      let prixTotal =0;
      for(let i =0 ; i < items.length; i++){
        if(items[i].price < 0 ){
          items[i].price =0;
        }
        prixTotal += parseFloat(items[i].price);
      }
        return prixTotal ;
      }

  },

  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    closeInvoice() {
      this.TOGGLE_INVOICE();
     },
    addNewItems(){
      this.items.push({
        id: uid(),
        name: '',
    description:'',
        price:0
      })
    },
    deleteItem(id){
    this.items= this.items.filter((item) => item.id !== id);
},
  }




}

</script>

<style scoped>
.modal-title {
  color: #0275db;
}

.modal-dialog,.modal-content {
  color: #e4e6eb;
  background-color: #141415;
  border: none;
  position: fixed;
  z-index: 10000; /* Sit on top */
  left: 0;
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