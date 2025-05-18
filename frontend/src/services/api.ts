import axios from 'axios';
import { User, TableBooking, TimeSlotResponse, TableAvailabilityResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lemon_token');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: Omit<User, 'id'>) => 
    api.post('/auth/register', userData),

  setAuthToken: (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Menu APIs
export const menuAPI = {
  getMenuItems: () => 
    api.get('/menu'),
  
  getMenuItemsByCategory: (category: string) => 
    api.get(`/menu/category/${category}`),
};

// Booking APIs
export const bookingAPI = {
  createBooking: (bookingData: Omit<TableBooking, 'id'>) => 
    api.post<TableBooking>('/bookings', bookingData),
  
  getAvailableTimeSlots: (date: string) =>
    api.get<TimeSlotResponse>(`/bookings/time-slots?date=${date}`),
    
  getAvailableTables: (date: string, timeSlot: string) => 
    api.get<TableAvailabilityResponse>(`/bookings/availability?date=${date}&timeSlot=${timeSlot}`),
  
  getUserBookings: () => 
    api.get<TableBooking[]>('/bookings/user'),

  getBooking: (bookingId: string) =>
    api.get<TableBooking>(`/bookings/${bookingId}`),

  cancelBooking: (bookingId: string) =>
    api.delete<{ message: string }>(`/bookings/${bookingId}`),

  updateBooking: (bookingId: string, bookingData: Partial<Omit<TableBooking, 'id' | 'userId'>>) =>
    api.put<TableBooking>(`/bookings/${bookingId}`, bookingData),
};