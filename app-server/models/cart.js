import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    items: {
        type:
            [{
                pid: {
                    type: mongoose.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number, required: true
                },
                size: {
                    type: String, required: true
                },
                color: {
                    type: String, required: true
                },
                
            }]
    },
    user: { type: String, required: true }


});
export default mongoose.model("carts", cartSchema, 'carts');
