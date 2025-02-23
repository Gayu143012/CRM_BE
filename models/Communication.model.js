import mongoose from "mongoose";

const CommunicationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  type: {
    type: String,
    enum: ['email', 'phone', 'chat', 'meeting', 'video call', 'social media', 'query', 'other'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  summary: String,
  content: String,
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Communication = mongoose.model("Communication", CommunicationSchema);