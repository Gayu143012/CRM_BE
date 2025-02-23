import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

export const Order = mongoose.model("Order", OrderSchema);