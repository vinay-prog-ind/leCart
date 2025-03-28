import axios from "axios";

const uri = import.meta.env.VITE_APP_URI;



const api = axios.create({
    baseURL: uri,
})

export const userLogin = async (userData) => {

    const user = await api.post('/user/login', userData);
    return user.data;
} 

export const userRegister = async (userData) => {
    const user = await api.post('/user/register', userData);
    return user;
}

export const testCookie = async () => {
    const data = await api.get('/test');
    return data;
}

export const addPost = async (product) => {
    const data = await api.post('/product/new', product);
    return data;
}

export const fetchCategories = async () => {
    const res = await api.get("/category/categories");
    const data = res.data;
    return data;
} 