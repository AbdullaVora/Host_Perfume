const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      trim: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Process', 'Dispacth', 'Delivered', 'Cancelled'],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: true, // true = active, false = inactive
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const orderStatus = mongoose.model('orderStatus', orderStatusSchema);

module.exports = orderStatus;