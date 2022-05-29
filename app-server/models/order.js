import mongoose from 'mongoose';

 const orderSchema = mongoose.Schema({
     orderNo : {type:String,required: true },
     items : { type:Array, required:true },
     totalamount : {type:Number, required: true },
     paymentmethod : {type:String, required: true },
     status: { type:String, required:true },
     user :{ type:String, required:true }


 });
  export default mongoose.model("orders",orderSchema, 'orders') ;
