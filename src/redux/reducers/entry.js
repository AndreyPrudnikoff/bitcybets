import {
    AUTHORIZATION, CREATE_AD, DEVICE_WIDTH,
    GET_COURSE,
    GET_LOCATION, GOAWAY, LOGOUT,
    PROHIBITION,
    REGISTRATION
} from "../types";

const initialState = {
    auth: false,
    reg: false,
    geoposition: '',
    course: [],
    currentCourse: 0,
    currentTime: 0,
    lastSeconds: undefined,
    logoutQuestion: false,
    createAd: false,
    unauthorized: false,
    widthMode: window.outerWidth > 756 ? "desktop" : "mobile"
}

export const switchOptions = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_AD:
            return {...state, createAd: !state.createAd};
        case DEVICE_WIDTH:
            return {...state, widthMode: action.payload};
        default:
            return state;
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION:
            if (sessionStorage.getItem('token') !== null) {
                return {...state, auth: true, unauthorized: false};
            } else {
                return {...state, auth: false};
            }
        case GOAWAY:
            return {
                ...state,
                unauthorized: true
            };
        case PROHIBITION:
            return {...state, auth: false};
        case REGISTRATION:
            return {...state, reg: !state.reg}
        case LOGOUT:
            return {...state, logoutQuestion: !state.logoutQuestion}
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

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSE:
            return {
                ...state,
                course: action.payload.bitcoins,
                currentCourse: action.payload.bitcoins ? action.payload.bitcoins[action.payload.bitcoins.length - 1] : 0,
                currentTime: action.payload.times ? action.payload.times[action.payload.times.length - 1] : 0,
                lastSeconds: action.payload.lastSeconds
            };
        default:
            return state;
    }
}

