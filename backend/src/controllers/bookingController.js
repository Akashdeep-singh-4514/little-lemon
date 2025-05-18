import { validationResult } from 'express-validator';
import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Parse the date and set hours to start of day to avoid timezone issues
    const bookingDate = new Date(req.body.date);
    bookingDate.setHours(0, 0, 0, 0);

    // Check if table is available
    const existingBooking = await Booking.findOne({
      date: bookingDate,
      timeSlot: req.body.timeSlot,
      tableNumber: req.body.tableNumber,
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Table is not available for this time slot' });
    }

    const booking = new Booking({
      ...req.body,
      date: bookingDate,
      userId: req.user.id,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailableTimeSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Get all bookings for the specified date
    const bookings = await Booking.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Define all time slots
    const allTimeSlots = [
      "11:00", "12:00", "13:00", "14:00", 
      "15:00", "16:00", "17:00", "18:00", 
      "19:00", "20:00", "21:00"
    ];

    // Create availability map for each time slot
    const availability = allTimeSlots.map(timeSlot => {
      const bookingsInSlot = bookings.filter(booking => booking.timeSlot === timeSlot);
      const availableTables = 12 - bookingsInSlot.length; // Total tables - booked tables
      
      return {
        timeSlot,
        available: availableTables > 0
      };
    });

    res.json({
      date,
      availability
    });
  } catch (error) {
    console.error('Get available time slots error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailableTables = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;

    if (!date || !timeSlot) {
      return res.status(400).json({ message: 'Date and time slot are required' });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find all bookings for the specified date and time
    const bookings = await Booking.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      timeSlot: timeSlot
    });

    // Create array of all tables with their properties
    const allTables = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      seats: i < 4 ? 2 : i < 8 ? 4 : 6, // Tables 1-4: 2 seats, 5-8: 4 seats, 9-12: 6 seats
      available: true
    }));

    // Mark booked tables as unavailable
    bookings.forEach(booking => {
      const tableIndex = allTables.findIndex(table => table.number === booking.tableNumber);
      if (tableIndex !== -1) {
        allTables[tableIndex].available = false;
      }
    });

    res.json({
      date,
      timeSlot,
      tables: allTables
    });
  } catch (error) {
    console.error('Get available tables error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ date: 'asc' });

    res.json(bookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking is in the future
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({ message: 'Cannot cancel past bookings' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking is in the future
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({ message: 'Cannot modify past bookings' });
    }

    // If changing date, time, or table, check availability
    if (req.body.date || req.body.timeSlot || req.body.tableNumber) {
      const newDate = req.body.date ? new Date(req.body.date) : booking.date;
      const newTimeSlot = req.body.timeSlot || booking.timeSlot;
      const newTableNumber = req.body.tableNumber || booking.tableNumber;

      const existingBooking = await Booking.findOne({
        _id: { $ne: booking._id }, // Exclude current booking
        date: newDate,
        timeSlot: newTimeSlot,
        tableNumber: newTableNumber
      });

      if (existingBooking) {
        return res.status(400).json({ message: 'Table is not available for this time slot' });
      }
    }

    // Update the booking
    Object.assign(booking, req.body);
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 