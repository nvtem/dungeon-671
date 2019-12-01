import Vue from 'vue'
import App from './App.vue'
import {initStore} from "./store";

import 'reset-css/reset.css'

let store = initStore()

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
