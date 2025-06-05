import axios from "axios"

const API_URL = "http://10.0.2.2:8080"

const api = axios.create({
    baseURL: API_URL
})

export default api