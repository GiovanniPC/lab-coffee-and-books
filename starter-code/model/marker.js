const mongoose = require('mongoose');

const { Schema } = mongoose;

const markerSchema = new Schema({
  name: String,
  type: { type: String, enum: ['coffee shop', 'bookstore'] },
  location: { type: { type: String }, coordinates: [Number] },
}, {
  timestamps: true,
});

markerSchema.index({ location: '2dsphere' });

const Marker = mongoose.model('Place', markerSchema);

module.exports = Marker;
