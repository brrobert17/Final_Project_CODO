import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.136.131.82:5000"
    //baseURL: "http://192.168.0.3:5000"
});