import axios from "axios";

const uri = import.meta.env.VITE_APP_URI;

const api = axios.create({
    baseURL: uri,
    withCredentials: true
})

export const login = async (userData) => {

    const user = await api.post('/user/login', userData);
    return user;
} 

export const register = async (userData) => {
    const user = await api.post('/user/register', userData);
    return user;
}