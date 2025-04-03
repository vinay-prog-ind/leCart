import axios from "axios";

const uri = import.meta.env.VITE_APP_URI;



export const api = axios.create({
    baseURL: uri,
})

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // Or use Context API to get the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// export const userLogin = async (userData) => {

//     const user = await api.post('/user/login', userData);
//     console.log(user);
//     return user;
// }
export const AdminLogin = async (userData) => {

    const user = await api.post('/user/login/admin', userData);
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

export const fetchAllPost = async () => {
        const res = await api.get(`/product?category=all`);
        return  res.data;

}
export const fetchProducts = async (category) => {
        const category_name = parseInt(category.queryKey[1]);
        const res = await api.get(`/product?category=${category_name}`);
        console.log(res);
        return res.data.data;
}

export const fetchPostDetail = async (query) => {
        const id = parseInt(query.queryKey[1]);
        const res = await api.get(`product/${id}`);
        return res.data[0];
}