import { USER__DATA__GET } from "./actionType";

const initialState = {
    isLoading : false,
    isError : false,
    data : []
}

export const reducer = (state=initialState, {type, payload}) =>{
    switch (type) {
        case USER__DATA__GET:
            return {...state, data : payload}
        default:
            return state;
    }
}