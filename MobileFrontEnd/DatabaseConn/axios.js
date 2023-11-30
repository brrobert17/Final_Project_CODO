import axios from "axios";

export const api = axios.create({
    //baseURL: "http://10.136.132.134:5000" //Robofellator
    //baseURL: "http://192.168.1.102:5000" //Adam

    baseURL: "http://192.168.0.3:5000" //School
});