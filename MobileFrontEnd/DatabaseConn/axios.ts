import axios from "axios";
import {API_BASE_URL} from "@utils/networkConfig/ip4";

export const api = axios.create({
    //baseURL: "http://10.136.132.134:5000" //Robofellator
    //baseURL: "http://192.168.1.102:5000" //Adam

    baseURL: API_BASE_URL
});