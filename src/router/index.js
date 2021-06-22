import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Invoice from '../views/Invoice.vue'
import invoiceView from "../views/invoiceView";

const routes = [
    {
        path: '/',
        name: 'Invoice',
        component: Invoice
    },
    {
        path: '/invoice/:invoiceId',
        name: 'InvoiceView',
        component: invoiceView
    },
]

const router = createRouter({

    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes
})

export default router
