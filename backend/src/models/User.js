const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // from NextAuth or custom auth
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // for local auth, optional for OAuth
  provider: { type: String, enum: ['local', 'google'], default: 'local' },
  providerId: { type: String }, // Google ID for OAuth users
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  address: { type: String },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);