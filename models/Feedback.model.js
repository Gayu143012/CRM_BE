import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

export const Feedback = mongoose.model("Feedback", feedbackSchema)