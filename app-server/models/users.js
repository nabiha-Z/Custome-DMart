import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    picture :{type: String},
    favorites: { type: Array, required: true },
    resetToken: { type: String},
    expires: { type: Date },
    address: {type:String, required:true},
    tempVideo : {type:String}

});
export default mongoose.model("users", usersSchema,'users');


