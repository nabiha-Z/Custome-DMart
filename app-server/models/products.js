import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  picture: { type: String, required: true },
  price: { type: Number, required: true },
  main_category: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: Array },
  color: { type: String, required: true },
  colorCode:{ type: String, required: true },
  arImage :{ type: String },
  sizes: { type: Array }


},{timestamp:true});
export default mongoose.model("products", productsSchema, 'products');
