import axios from "axios";
import { USER__DATA__GET } from "./actionType"

export const userGetData = (payload) => ({type : USER__DATA__GET, payload});



export const getUsrDataFromAPI = () => (dispatch) =>{
    return axios.get("http://localhost:3030/users").then(res=>{
        dispatch(userGetData(res.data))
    })
}


export const userPostToAPI = (data) => (dispatch) =>{
    return axios.post("http://localhost:3030/users", data).then(res=>{
        console.log(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const scoreUpdateToAPI = (id, data) => (dispatch) =>{
    return axios.patch(`http://localhost:3030/users/${id}`, data).then(res=>{
        console.log(res.data);
    }).catch(err=>{
        console.log(err);
    })
}