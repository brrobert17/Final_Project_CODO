import axios from "axios";
export const api = axios.create({
    //baseURL: "http://192.168.1.101:5000"
    baseURL: "http://localhost:5000"
});