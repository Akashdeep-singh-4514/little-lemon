export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export type Category = 'appetizers' | 'main_courses' | 'desserts' | 'drinks' | 'specials';

export interface TableBooking {
  _id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  numberOfPeople: number;
  date: string;
  timeSlot: string;
  tableNumber: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Table {
  id: number;
  seats: number;
  available: boolean;
}

export interface TableAvailability {
  number: number;
  seats: number;
  available: boolean;
}

export interface TimeSlotAvailability {
  timeSlot: string;
  available: boolean;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  numberOfPeople: number;
  date: Date;
  timeSlot: string;
  tableNumber: number;
}

export interface TimeSlotResponse {
  date: string;
  availability: TimeSlotAvailability[];
}

export interface TableAvailabilityResponse {
  date: string;
  timeSlot: string;
  tables: TableAvailability[];
}