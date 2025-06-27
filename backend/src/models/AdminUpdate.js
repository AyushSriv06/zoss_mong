const mongoose = require('mongoose');

const adminUpdateSchema = new mongoose.Schema({
  modelNumber: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  description: { type: String },
  defaultWarrantyMonths: { type: Number, default: 12 },
  defaultAmcMonths: { type: Number, default: 12 },
  serviceFrequencyDays: { type: Number, default: 90 }, // e.g. service every 90 days
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
adminUpdateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('AdminUpdate', adminUpdateSchema);