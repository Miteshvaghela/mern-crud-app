import React, { useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchPrdouct = async () => {
            fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(res => setProducts(res.data)) 
        }
        fetchPrdouct();
    }, [products]) 


    

    const deleteProduct = async (id) => {
        const serverPath = import.meta.env.VITE_APP_SERVER;
        await fetch(`${serverPath}/products/${id}`, {
            method : 'DELETE'
        })
        fetchPrdouct();
        alert('Product deleted successfully');
    }


    const updateProduct = async (data) => {
        const getProduct = await fetch(`http://localhost:5000/products/${data.id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const res = await getProduct.json();
        console.log(res, ' update product');
        
    }

  return (
    <Container fluid> 
        <h3>Feature Products</h3>
        <div>{(products.length)? <div className='product-block'>
            {products.map(product => (
            <div key={product._id} className={`product ${product.active ? 'active' : ''}`}>
                <img src={`${import.meta.env.VITE_APP_SERVER}/uploads/${product.image}`} alt={product.name} className='product-img d-block' />
                <div className="info mt-3">
                    <p>Name : <strong>{product.name}</strong></p>
                    <p>Description : <strong>{product.description}</strong></p>
                    <p>Price : <strong>${product.price}</strong></p>
                    <div className='d-flex justify-content-between'>
                    <Link onClick={() => deleteProduct(product._id)} className='btn btn-danger'>Delete</Link>
                    <Link to={`/product/${product._id}`} className='btn btn-warning'>Update</Link>
                </div>
                </div>
            </div>
        ))}
        </div> :'No products'}</div>
    </Container>
  )
}

export default Products