import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken : {type: String, requires:true},
  expires :{type:Date, requires:true}
});

export default mongoose.model("Admin", adminSchema);