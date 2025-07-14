const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  issueDescription: { type: String, required: true },
  requestedDate: { type: Date, required: true },
  requestedTime: { type: String, required: true },
  nextServiceDate: { type: Date },
  lastServiceDate: { type: Date },
  status: {
    type: String,
    enum: ['Upcoming', 'Due Soon', 'Overdue', 'Completed', 'Pending Approval', 'Approved & Scheduled'],
    default: 'Pending Approval',
  },
  notificationSent: { type: Boolean, default: false },
  serviceNotes: { type: String },
  technicianName: { type: String },
  technicianContact: { type: String },
  scheduledDate: { type: Date },
  scheduledTime: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', serviceSchema);