// key: 62b63e9e95ce6c3048c3dd5a2f2df427

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.openweathermap.org/",
})

export default api;