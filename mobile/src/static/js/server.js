import axios from 'axios';
import qs from 'qs';
import { Promise, reject } from 'q';
import { resolve } from 'url';

let http={
    post: "",
    get: ""
}

let api = "127.0.0.1:3000";

http.post = function(route,data){
    let params = qs.stringify(data);
    return new Promise((route,reject)=>{
        axios.post(api+route,params).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}
http.get = function(route,data){
    let params = qs.stringify(data);
    return new Promise((route,reject)=>{
        axios.get(api+route,params).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}

export default http;