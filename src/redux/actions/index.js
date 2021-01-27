import {
    AUTHORIZATION,
    BET_LOSE,
    BET_WIN,
    CLOSE_CONGRATULATION,
    GET_COURSE, GET_CURRENT_COURSE,
    GET_LOCATION, LOGOUT,
    PROHIBITION,
    REGISTRATION
} from "../types";

export function authorization() {
    return {type: AUTHORIZATION}
}

export function prohibition() {
    return {type: PROHIBITION}
}

export function registration() {
    return {type: REGISTRATION}
}
export function logoutQuestion() {
    return {type: LOGOUT}
}

export function geoposition() {
    let namePlace = '';
    return dispatch => {
        navigator.geolocation.getCurrentPosition(async pos => {
            let locationPlace = pos.coords.latitude + "," + pos.coords.longitude;
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=abd620940ef44119b1f161639201704&q=${locationPlace}`);
            const data = await response.json();
            namePlace = data.location.name
            dispatch({type: GET_LOCATION, payload: namePlace})
        })
    }
}

export function bitcoinCourse(data) {
    return dispatch => {
        dispatch({type: GET_COURSE, payload: data});
    }
}
export function bitcoinCurrentCourse() {
    return dispatch => {
        dispatch({type: GET_CURRENT_COURSE});
    }
}
export function betWin(data) {
    return dispatch => {
        dispatch({type: BET_WIN, payload: data});
    }
}
export function betLose(data) {
    return dispatch => {
        dispatch({type: BET_LOSE, payload: data});
    }
}
export function closeCongratulation(data) {
    return dispatch => {
        dispatch({type: CLOSE_CONGRATULATION});
    }
}