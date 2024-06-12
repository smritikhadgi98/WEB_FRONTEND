import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleProduct, updateProduct } from '../../../apis/Api'

const UpdateProduct = () => {
    //get id from url
    const { id } = useParams()



    //get product information (Backend)
    useEffect(() => {

        getSingleProduct(id).then((res) => {

            setProductName(res.data.product.productName)
            setProductPrice(res.data.product.productPrice)
            setProductCategory(res.data.product.productCategory)
            setProductDescription(res.data.product.productDescription)
            setOldImage(res.data.product.productImage)

            // console.log(res.data)

        }).catch((error) => {
            console.log(error)
        })

    }, [])











    // get id from url
    // get product information (Backend)
    // fill all the info in each fields

    // make a use state
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productDescription, setProductDescription] = useState('')

    // state for image
    const [productNewImage, setProductNewImage] = useState(null)
    const [previewNewImage, setPreviewNewImage] = useState(null)
    const [oldImage, setOldImage] = useState('')

    // image upload handler
    const handleImage = (event) => {
        const file = event.target.files[0]
        setProductNewImage(file) // for backend
        setPreviewNewImage(URL.createObjectURL(file))
    }

    // update product

    const handleUpdate = (e) => {
        e.preventDefault()

        //make a form data
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productDescription', productDescription)
        if (productNewImage) {
            formData.append('productImage', productNewImage)

        }


        //Api call
        updateProduct(id, formData).then((res) => {
            if (res.status === 201) {

                toast.success(res.data.message)
            }

        }).catch((error) => {

            if (error.response) {
                if (error.response.status === 500) {
                    toast.error(error.response.data.message)
                }
            }

        })
    }





    return (
        <>
            <div className='container mt-3'>

                <h2>Update product for <span className='text-danger'>{productName}</span></h2>

                <div className='d-flex gap-3'>
                    <form action="">
                        <label htmlFor="">Product Name</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} className='form-control' type="text" placeholder='Enter your product name' />

                        <label className='mt-2' htmlFor="">Product Price</label>
                        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='form-control' type="number" placeholder='Enter your product name' />

                        <label className='mt-2'>Choose category</label>
                        <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                            <option value="plants">Plants</option>
                            <option value="electronics">Electronics</option>
                            <option value="gadgets">Gadgets</option>
                            <option value="furniture">Furniture</option>
                        </select>

                        <label className='mt-2'>Enter description</label>
                        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                        <label className='mt-2'>Choose product Image</label>
                        <input onChange={handleImage} type="file" className='form-control' />

                        <button onClick={handleUpdate} className='btn btn-danger w-100 mt-2'>Update Product</button>


                    </form>
                    <div className='image section'>
                        <h6>Previewing old image</h6>
                        <img height={'200px'} width={'300px'} className='image-fluid rounded-4 object-fit-cover' src={`http://localhpst:5000/products/${oldImage}`} />

                        {
                            previewNewImage && <>
                                <h6>Previewing new image</h6>
                                <img height={'200px'} width={'300px'} className='img-fluid rounded-4 object-fit-cover' src={previewNewImage} alt="preview image" />
                            </>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateProduct
