const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  nextServiceDate: { type: Date, required: true },
  lastServiceDate: { type: Date },
  status: {
    type: String,
    enum: ['Upcoming', 'Due Soon', 'Overdue', 'Completed'],
    default: 'Upcoming',
  },
  notificationSent: { type: Boolean, default: false },
  serviceNotes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', serviceSchema);