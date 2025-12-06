name,email,companyName,address,phoneNumber,message


import mongoose from "mongoose";

const Message = new mongoose.Schema(
  {
    name: {
      type: String,
      
      required: true,
    },
    email: {
      type: String,
  
      required: true,
    },
    companyName: {
      type: String,
  
      required: true,
    },
    address: {
      type: String,
  
      required: true,
    },
    phoneNumber: {
      type: String,
  
      required: true,
    },
    message: {
      type: String,
  
      required: true,
    },

  
  },
  { timestamps: true }
);

// Prevent overwrite model error in hot reload
export default mongoose.models.Message
  ? mongoose.models.Message
  : mongoose.model("Demo", MessageSchema);