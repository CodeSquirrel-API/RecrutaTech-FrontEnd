import axios from 'axios'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// axios.defaults.baseURL = 'https://api-recrutatech-b49a1abd63c1.herokuapp.com/';  //global para conexao banco
// axios.defaults.baseURL = 'http://localhost:8080/';  //global para conexao banco
axios.defaults.baseURL = 'https://api-recrutatech.onrender.com/';

