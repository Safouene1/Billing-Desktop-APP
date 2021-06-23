<template>
  <div class="main-wrapper item ">
    <div class="container main-container">
      <router-link :to="{name:'InvoiceView', params:{ invoiceId: invoice.invoiceId}}">
        <div class="row main-row">
          <div class="col-12 align-center">
            <div class="row p-3">
              <div class="col-2 align-middle">
                #{{ invoice.invoiceId }}
              </div>
              <div class="col-2 align-middle">
                {{ invoice.invoiceDate }}
              </div>
              <div class="col-2 align-middle ">
                {{ invoice.clientName }}
              </div>
              <div class="col-2 align-middle">
                {{ invoice.prixTotal }} TND
              </div>
              <div class="col-2 align-middle ">
                <p :class="{ pending : invoice.invoicePending, paid : invoice.invoicePaid  }" class=" py-2 rounded-pill"
                   type="button ">

                  {{ Status }}</p>
              </div>
              <div class="col-2 align-middle">
                <button class="btn btn-dark mx-1">
                  <svg class="bi bi-box-arrow-right" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        fill-rule="evenodd"/>
                    <path
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        fill-rule="evenodd"/>
                  </svg>
                </button>
                <button class="btn btn-dark mx-1 ">
                  <svg class="bi bi-trash-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>

                <button class="btn btn-dark mx-1">
                  <svg class="bi bi-pen-fill" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                  </svg>
                </button>

              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "invoicesList",
  props: ["invoice"],
  methods: {},
  computed: {
    Status() {
      if (this.invoice.invoicePending) {
        return "En Attente"
      }
      return "payé"
    },
  }
}
</script>

<style scoped>
.main-wrapper {
  background-color: #242526;
  color: #e4e6eb;
}

.main-container {
  margin-top: 18px;
  padding: 2px;
}

.item:hover {
  background-color: #3A3B3C;

}

.pending:hover {
  background-color: #11A200;


}

.pending {
  background-color: #FF6900;
}

.paid:hover {

  background-color: #FF6900;
}

.paid {
  background-color: #11A200;
}


a {
  color: #e4e6eb;
  text-decoration: none;

}

a:hover {
  color: white;
}
</style>