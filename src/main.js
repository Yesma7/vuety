import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

//Emitter
import mitt from 'mitt'
const emitter = mitt()

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

//FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css'


//Vue-Code-Highlight - Fragmentos de código
import "vue-code-highlight/themes/prism-okaidia.css"
import "vue-code-highlight/themes/window.css"
import VueCodeHighlight from "vue-code-highlight";

createApp(App).provide('emitter', emitter).use(VueCodeHighlight).use(router).use(bootstrap).mount('#app')
