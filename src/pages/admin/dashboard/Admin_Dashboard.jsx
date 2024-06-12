
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createProductApi, deleteProduct, getAllProductsApi } from '../../../apis/Api'



const AdminDashboard = () => {

    // 1. State for all fetched products
    const [products, setProducts] = useState([])

    //call api initially (page load) - set all fetch products to state (1)
    useEffect(() => {
        getAllProductsApi().then((res) => {
            // response : res.data.products (All products)
            setProducts(res.data.products)
            console.log(products)

        }).catch((error) => {
            console.log(error)

        })
    }, [])


    //use state
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productDescription, setProductDescription] = useState('')

    //state for image
    const [productImage, setProductImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    //function for image
    const handleImage = (event) => {
        const file = event.target.files[0]
        setProductImage(file) //for backend
        setPreviewImage(URL.createObjectURL(file))
    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // make a form data (text,files)
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productDescription', productDescription)
        formData.append('productImage', productImage)

        // make a api call
        createProductApi(formData).then((res) => {

            //for success Api
            if (res.data.success === 201) {
                toast.success(res.data.message)

            }

        }).catch((error) => {
            if (error.response) {

                if (error.response.status === 400) {
                    toast.warning(error.response.data.message)

                } else if (error.response.status === 500) {
                    toast.warning(error.response.data.message)

                }
                else {
                    toast.error('Something went worng')
                }

            }

        });

    }

    //handle delete product
    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure you want to delete this product?')
        if (confirmDialog) {
            // make a api call
            deleteProduct(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message)
                    window.location.reload()
                }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message)

                    } else if (error.response.status === 500) {
                        toast.warning(error.response.data.message)
                    }
                    else {
                        toast.error('Something went worng')
                    }
                }
            })


        }
        // make a api call

    }

    return (
        <>

            <div className='container mt-3'>
                <div className='d-flex justify-content-between'>
                    <h3>Admin Dashboard</h3>


                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Product
                    </button>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new product</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action=''>
                                        <label>Product Name</label>
                                        <input onChange={(e) => setProductName(e.target.value)} type='text' className='form-control' placeholder='Enter Product Name' />

                                        <label className='mt-2'>Product Price</label>
                                        <input onChange={(e) => setProductPrice(e.target.value)} type='number' className='form-control' placeholder='Enter Product Price' />

                                        <label className='mt-2'>Product Category</label>
                                        <select onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                                            <option value="plants">Plants</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="gadgets">Gadgets</option>
                                            <option value="furniture">Furniture</option>
                                        </select>

                                        <label className='mt-2'>Enter Description</label>
                                        <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control' placeholder='Enter Description'></textarea>

                                        <label className='mt-2'>Product Image</label>
                                        <input onChange={handleImage} type='file' className='form-control' />

                                        {
                                            previewImage && <img src={previewImage} alt=" preview image" className='img-fluid rounded mt-2' />
                                        }

                                    </form>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type='button' class="btn btn-primary">Save </button>

                                    {/* Preview Image */}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <table className='table mt-2'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((singleProduct) => (
                                <tr>
                                    <td>
                                        <img width={'10%'} height={'40%'} src={`http://localhpst:5000/products/${singleProduct.productImage}`} alt=" " style={{ width: '100px', height: '50px' }} /></td>

                                    <td>{singleProduct.productName}</td>
                                    <td>{singleProduct.productPrice}</td>
                                    <td>{singleProduct.productCategory}</td>
                                    <td>{singleProduct.productDescription}</td>
                                    <td>
                                        <Link to={`/admin/update/${singleProduct._id}`} className='btn btn-primary'> Edit</Link>
                                        <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-danger ms-2'> Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>



        </>
    )
}


export default AdminDashboard


// Edit product
// Admin Dsshboard
// Make a route
// Fill all the related information Only

