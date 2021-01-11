import {AUTHORIZATION, GET_LOCATION, PROHIBITION, REGISTRATION} from "../types";

const initialState = {
    auth: false,
    reg: false,
    geoposition: ''
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION:
            return {...state, auth: true};
        case PROHIBITION:
            return {...state, auth: false};
        case REGISTRATION:
            console.log(!state.reg)
            return {...state, reg: !state.reg}
        default:
            return state;
    }
}

export const geoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATION:
            return {...state, geoposition: action.payload};
        default:
            return state;
    }
}
