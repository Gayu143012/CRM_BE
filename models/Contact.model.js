import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: String,
});

export const Contact = mongoose.model("Contact", contactSchema);