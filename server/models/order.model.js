import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

    userId : {
        type : String,
        required : true
    },
    products : {
        type : Array,
        required : true
    },
    amount : {
        type : Number,
        required : true,
    },
    address : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'pending'
    }
},
{
    timestamps : true
});


const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;