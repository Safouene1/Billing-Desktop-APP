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
        editInvoice: null,


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
        },
        TOGGLE_EDIT_INVOICE(state) {
            state.editInvoice = !state.editInvoice;
        },
        DELETE_INVOICE(state, payload) {

            state.invoiceData = state.invoiceData.filter(invoice => invoice.docId !== payload)
        },
        TOGGLE_PAYEMENT(state, payload) {
            state.invoiceData.forEach(invoice => {
                if (invoice.docId == payload) {
                    invoice.invoicePaid = !invoice.invoicePaid;
                    invoice.invoicePending = !invoice.invoicePending;
                }
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
        },
        async UPDATE_INVOICE({commit, dispatch}, {docId, routeId}) {
            commit('DELETE_INVOICE', docId);
            await dispatch('GET_INVOICES');

            commit('TOGGLE_INVOICE');
            commit('TOGGLE_EDIT_INVOICE');
            commit('SET_CURRENT_INVOICE', routeId);
        },
        async DELETE_INVOICE({commit}, docId) {


            const getInvoice = db.collection("invoices").doc(docId);

            await getInvoice.delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });

            commit('DELETE_INVOICE', docId);


        },
        async UPDATE_STATUS_TO_PAID({commit}, docId) {
            const getInvoice = db.collection("invoices").doc(docId);
            await getInvoice.update({
                invoicePaid: true,
                invoicePending: false,
            });
            commit("TOGGLE_PAYEMENT", docId);
        },
        async UPDATE_STATUS_TO_PENDING({commit}, docId) {
            const getInvoice = db.collection("invoices").doc(docId);
            await getInvoice.update({
                invoicePaid: false,
                invoicePending: true,
            });
            commit("TOGGLE_PAYEMENT", docId);
        }
    },
    modules: {}
})
