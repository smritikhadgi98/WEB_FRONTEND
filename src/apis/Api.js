import axios from "axios";

// Creating backend Config!
const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers : {
        'Content-Type' : 'multipart/form-data'
    }
})


//make a config
const config = {
    headers : {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

// Test API 
export const testApi = () => Api.get('/test')


// Register Api

export const registerUserApi = (data) => Api.post('/api/user/create',data)

// Login Api
export const loginUserApi = (data) => Api.post('/api/user/login',data)

// create product API

export const createProductApi = (data) => Api.post('/api/product/create',data)

// get all products API
export const getAllProductsApi = () => Api.get('/api/product/get_all_products',config)


// get single product API
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config)

// delete product Api
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`)

// update product Api
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id, data}`)




// "http://localhost:5000/test"

