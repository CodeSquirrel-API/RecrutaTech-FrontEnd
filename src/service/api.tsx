import axios from 'axios';

const api = axios.create({
    baseURL: "https://8080-codesquirre-recrutatech-x75p1gsa7ic.ws-us105.gitpod.io/"
})

export default api;