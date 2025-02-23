import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  preferences: {
    fabricTypes: [String],
    colors: [String],
    designs: [String],
    patterns: [String],
    seasons: [String],
    occasions: [String],
  },
  purchaseHistory: [
    {
      date: Date,
      items: [
        {
          name: String,
          quantity: Number,
          price: Number,
        },
      ],
      total: Number,
    },
  ],
  source: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  source: String,
status: String,
followUpActions: [{
  type: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true }
}],

});


export const Customer = mongoose.model("Customer", CustomerSchema)