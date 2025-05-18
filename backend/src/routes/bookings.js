import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { 
  createBooking, 
  getAvailableTimeSlots, 
  getAvailableTables, 
  getUserBookings,
  cancelBooking,
  updateBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// Create a booking
router.post(
  '/',
  auth,
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('numberOfPeople').isInt({ min: 1, max: 10 }).withMessage('Number of people must be between 1 and 10'),
    body('date').isISO8601().withMessage('Invalid date'),
    body('timeSlot').notEmpty().withMessage('Time slot is required'),
    body('tableNumber').isInt({ min: 1, max: 12 }).withMessage('Invalid table number'),
  ],
  createBooking
);

// Get available time slots for a specific date
router.get('/time-slots', getAvailableTimeSlots);

// Get available tables for a specific date and time
router.get('/availability', getAvailableTables);

// Get user's bookings
router.get('/user', auth, getUserBookings);

// Cancel a booking
router.delete('/:id', auth, cancelBooking);

// Update a booking
router.put(
  '/:id', 
  auth,
  [
    body('firstName').optional().trim().notEmpty().withMessage('First name is required'),
    body('lastName').optional().trim().notEmpty().withMessage('Last name is required'),
    body('numberOfPeople').optional().isInt({ min: 1, max: 10 }).withMessage('Number of people must be between 1 and 10'),
    body('date').optional().isISO8601().withMessage('Invalid date'),
    body('timeSlot').optional().notEmpty().withMessage('Time slot is required'),
    body('tableNumber').optional().isInt({ min: 1, max: 12 }).withMessage('Invalid table number'),
  ],
  updateBooking
);

export default router; 