const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ['estudiante', 'admin'], default: 'estudiante' },
  modulosCompletados: [Number],
  insignias: [String],
});

module.exports = mongoose.model('User', userSchema);
