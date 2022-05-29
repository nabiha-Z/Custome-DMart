import mongoose from "mongoose";

const designerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact:{type:String, required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  resetToken : {type: String, requires:true},
  expires :{type:Date, requires:true}
});

export default mongoose.model("Designer", designerSchema);