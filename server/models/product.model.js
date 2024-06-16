import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    active : {
        type : Boolean,
        default : true,
    },
    image : {
        type : String
    }
},
{
    timestamps : true
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;