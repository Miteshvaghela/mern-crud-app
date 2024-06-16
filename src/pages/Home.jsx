import React from 'react'
import { Container } from 'react-bootstrap'
import Products from '../components/Products'
const Home = () => {
  return (
    <Container fuild={+true} className='my-5'>
      <Products />
    </Container>
  )
}

export default Home