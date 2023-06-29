import axios from 'axios'

export const API_URL = 'https://seferly-server.onrender.com';

export const TOKEN_NAME = "SECOND_BOOK";


export const doApiGet = async (_url) => {
    try {
        let resp = await axios.get(_url, {

            headers: {
                'Content-Type': 'application/json',
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}


export const doApiMethodSignUpLogin = async (_url, _method, _body) => {
    try {

        let resp = await axios({
            method: _method,
            url: _url,
            data: JSON.stringify(_body),
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}


// For Post,delete, put, patch
export const doApiMethod = async (_url, _method, _body = {}) => {
    try {
        console.log(_body)
        let resp = await axios({
            url: _url,
            method: _method,
            data: _body,
            headers: {
                "x-api-key": localStorage[TOKEN_NAME]
            }
        })
        return resp;
    }
    catch (err) {
        throw err;
    }
}


export const checkUserAdmin = async () => {
    let url = API_URL + "/users/checkToken"
    let resp = await doApiGet(url);
    return resp.data.role === "admin"
}


export const checkLogedIn = async () => {
    return localStorage.getItem(TOKEN_NAME) != null
}