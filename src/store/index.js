import {createStore} from 'vuex'
import db from "../firebase/firebaseinit"

export default createStore({
  state: {
    invoiceModal: null,
    warningModal: null,
    animate: null,
    invoiceData: [],
    invoicesLoaded: null,
    currentInvoiceArray: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.warningModal = !state.warningModal;
    },
    OPEN_MODAl(state) {
      state.warningModal = true;
      state.animate = !state.animate;
    },
    CLOSE_MODAl(state) {
      state.warningModal = false;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);

    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter(invoice => {
        return invoice.invoiceId === payload;
      })
    }
  },
  actions: {
    async GET_INVOICES({commit, state}) {
      const getData = db.collection('invoices');
      const results = await getData.get();
      results.forEach(doc => {
        if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            invoiceDate: doc.data().invoiceDate,
            invoicePending: doc.data().invoicePending,
            invoicePaid: doc.data().invoicePaid,
            items: doc.data().items,
            prixTotal: doc.data().prixTotal,
          };
          commit('SET_INVOICE_DATA', data);
        }
      });
      commit('INVOICES_LOADED');
    }

  },
  modules: {
  }
})
