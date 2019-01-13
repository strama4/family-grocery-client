let API_URL = 'http://localhost:5000' 

export const fetchUser = (headers) => {
    return fetch(`${API_URL}/users/findUser`, headers)
}    

export const registerUser = (headers) => {
    console.log('APIURL', process.env.REACT_APP_STAGE)
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