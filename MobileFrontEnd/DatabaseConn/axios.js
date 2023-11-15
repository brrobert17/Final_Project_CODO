import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.136.131.212:5000"
});