import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios';

const Product = () => {
    const { id } = useParams();
    const [productId, setProductId] = useState(id);
    const [product, setProduct] = useState({});
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(false);
    const [newFile, setNewFile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrdouct = () => {
            fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(res => {
                setProduct(res.data)
                setFile(res.data.image)
            })
        }
        fetchPrdouct();
    }, [id])

    const handleChange = (event) => {
        setInputs(prev => {
            if(event.target.name === 'active'){
                return {...prev, [event.target.name]: event.target.checked}
            }else if(event.target.name === 'image'){
                return {...prev, [event.target.name]: event.target.files[0]}
            }else{
                return {...prev, [event.target.name]: event.target.value}
            }
        })
    }

    const handleFile = (e) => {
       const image = e.target.files[0];
       setNewFile(URL.createObjectURL(image)); 
    }

    const handleSave = (e) => {
        e.preventDefault();
        const serverPath = import.meta.env.VITE_APP_SERVER;
        if(!inputs.name || !inputs.price){
            alert('Please enter name and price');
            return;
        }

        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('price', inputs.price);
        formData.append('description', inputs.description);
        formData.append('active', inputs.active ?? false); 
        formData.append('id', productId);
        if(setNewFile)
            formData.append('image', inputs.image); 
        console.log(inputs)

        axios.put(`${serverPath}/products/${id}`, formData)
            .then(res => {
                if(res.status === 200){
                    alert('Product updated successfully');
                }

                navigate('/');
            })

    }
  return (
    <Container className='w-50 my-5'> 
        <h3>Update Product</h3>
        <Form onSubmit={handleSave} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={product.name} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" defaultValue={product.price} name="price" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" defaultValue={product.description} name="description" onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={event => { handleChange(event); handleFile(event)}} />
                { file && !newFile && <img src={`${import.meta.env.VITE_APP_SERVER}/uploads/${product.image}`} alt="image" className='w-25 image m-5 ms-0' />}
                { newFile && <img src={`${newFile}`} alt="image" className='w-25 image m-5 ms-0' />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="active">
                <Form.Label>Active</Form.Label>
                <Form.Check // prettier-ignore
                    type="switch" 
                    name="active"
                    defaultChecked={product.active}
                    onChange={handleChange}
                /> 
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="primary" type='submit' >Save Product</Button> 
            </Form.Group>
                  
        </Form>
    </Container>
  )
}

export default Product