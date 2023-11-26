import axios from 'axios';

const api = axios.create({
    baseURL: "https://api-recrutatech.onrender.com/"
}) 
const api2 = axios.create({
    baseURL: "https://api-recrutatech.onrender.com/"
})
const baseURL = axios.defaults.baseURL = "https://api-recrutatech.onrender.com/"

const baseURL2 = axios.defaults.baseURL2 = "https://ia-api-bmmx.onrender.com/colaborador"

export default baseURL; api; api2;