let API_URL = 'http://localhost:5000' 
// https://family-grocery-api.herokuapp.com
export const fetchUser = (headers) => {
    return fetch(`${API_URL}/users/findUser`, headers)
}    

export const registerUser = (headers) => {
    return fetch(`${API_URL}/users/register`, headers)
}

export const loginUser = (headers) => {
    return fetch(`${API_URL}/users/login`, headers)
}

export const fetchListItems = (listId) => {
    return fetch(`${API_URL}/lists/${listId}`)
}
export const getApiURL = () => {
    return API_URL;
}