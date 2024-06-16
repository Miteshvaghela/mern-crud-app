import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = ({}) => {

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(false);
    const navigate = useNavigate();
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

    const handleSave = (e) => {
        e.preventDefault(); 

        if(!inputs.name || !inputs.price){
            alert('Please enter name and price');
            return;
        }
        console.log(inputs); 
        addProduct(inputs);
    }

    
    const addProduct = async (data) => {
        const serverPath = import.meta.env.VITE_APP_SERVER;
        console.log(data);
        // const product = { 
        //     name : data.name,
        //     description : data.description,
        //     price : data.price,
        //     active : data.active, 
        //     image : data.image
        // }
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('name', data.name);
        formData.append('description', data.description ?? 'Sample description');
        formData.append('price', data.price);
        formData.append('active', data.active ?? false); 
        // await fetch('http://localhost:5000/products', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: JSON.stringify(formData)
        // });


        axios
            .post(`${serverPath}/products`, formData)
            .then(res => {
                console.log('Response from server');
            })


        alert('Product added successfully');
        navigate('/');
    }

    const handleFile = async (event) => {
        const serverPath = import.meta.env.VITE_APP_SERVER;
        const uploadedFile = event.target.files[0];
        setFile(
            URL.createObjectURL(uploadedFile)
        )
        // const formData = new FormData(); 
        // formData.append("file", uploadedFile); 
        
        // axios.post(
        //     `${serverPath}/upload`,
        //     formData)
        //     .then(res => {
        //         console.log(res, ' Response from Server');
        //     });
    }



  return (
    <Container className='w-50 my-5'> 
        <Form onSubmit={handleSave} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" name="price" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={event => { handleChange(event); handleFile(event)}} />
                { file && <img src={file} alt="image" className='w-25 image m-5 ms-0' />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="active">
                <Form.Label>Active</Form.Label>
                <Form.Check // prettier-ignore
                    type="switch" 
                    name="active"
                    onChange={handleChange}
                /> 
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="primary" type='submit'>Save Product</Button>
            </Form.Group>
                  
        </Form>
    </Container>
  )
}

export default AddProduct