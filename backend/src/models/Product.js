const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true }, // links to User.userId
  productName: { type: String, required: true },
  modelNumber: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  imageUrl: { type: String },
  amcValidity: {
    start: { type: Date },
    end: { type: Date },
  },
  warranty: {
    start: { type: Date },
    end: { type: Date },
  },
  isApprovedByAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);