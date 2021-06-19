import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import VueHtmlToPaper from '../plugins/VueHtmlToPaper'

const options = {
    name: 'facture',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        ''
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: true, // if false, the window will not close after printing
    windowTitle: window.document.title, // override the window title
}

createApp(App).use(store).use(router).use(VueHtmlToPaper, options).mount('#app');
