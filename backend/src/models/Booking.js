import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
}, {
  timestamps: true,
});

// Index for checking availability
bookingSchema.index({ date: 1, timeSlot: 1, tableNumber: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking; 