import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter as Router, Route, RouterProvider } from 'react-router-dom';
import Common from './routes/Common';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import AddProduct from './pages/AddProduct';
import Product from './pages/Product';
import Error from './pages/Error';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const router = Router([
  {
    path : '',
    element : <Common />,
    errorElement : <Error />,
    children : [
      {
        path : '/',
        element : <Home />
      },
      {
        path : '/contact',
        element : <Contact />
      },
      {
        path : '/product/:id',
        element : <Product />
      },
      {
        path : '/about',
        element : <About />
      },
      {
        path : '/add-product',
        element : <AddProduct />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(  
    <RouterProvider router={router} />
)
