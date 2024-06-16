import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import Path from 'path';
import mongoose from 'mongoose';
import ProductModel from './models/product.model.js';
import fs from 'fs';

dotenv.config();
const app = express();
const port = process.env.NODE_PORT || 6000; 
const __dirname = Path.resolve()
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png", "jpeg", "jpg"],
}))
app.use(express.json());
app.use(fileUpload());
// app.post('/upload', (req, res) => {
//     const { file } = req.files;
//     if(!file) return res.sendStatus(400) 

//     file.mv(__dirname + '/uploads/' + file.name);
//     res.sendStatus(200);
// })

app.get('/products', async (req, res) => {    
    const products = await ProductModel.find({}); 
    if(products){
        res.status(200).json({data : products});
    }else{
        res.status(400).json({message : 'No products found'});
    }
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({message : 'Product deleted successfully.'});
})

app.post('/products', async (req, res) => {
    const { name, description, price, active} = req.body; 
    const { image } = req.files 
    const imageName = new Date().getTime() + image.name; 
    const product = new ProductModel({ name, description, price, active, image : imageName });
    await product.save();
    image.mv(__dirname + '/uploads/' + imageName);
    res.status(200).json({message : 'Product saved successfully.'});
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if(product){
        res.status(200).json({data : product});
    }else{
        res.status(400).json({message : 'No product found'});
    }
})


app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, active} = req.body; 
    const product = await ProductModel.findById(id);
    if(product){
        product.name = name;
        product.description = description;
        product.price = price;
        product.active = active;

        // update image 
        if(req.files){
            const { image } = req.files; 
            const imageName = new Date().getTime() + image.name;
            product.image = imageName;
            req.files.image.mv(__dirname + '/uploads/' + imageName);
            console.log(__dirname + '/uploads/' + product.image, ' Unlink this');
            await  fs.unlink(__dirname + '/uploads/' + product.image, (err) => {
                console.error(err);
            })
            
        }

        
        await product.save();
        res.status(200).json({message : 'Product updated successfully.'});
    }else{
        res.status(400).json({message : 'No product found'});
    }
});


mongoose
    .connect(process.env.NODE_MONGO_URL)
    .then(() => {
        console.log('Connected to mongodb');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })        
    })
