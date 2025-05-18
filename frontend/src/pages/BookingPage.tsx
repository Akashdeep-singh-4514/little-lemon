import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format } from 'date-fns';
import { Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { TableAvailability, BookingFormData, TimeSlotResponse, TableAvailabilityResponse } from '../types';
import { bookingAPI } from '../services/api';

const timeSlots = [
  "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", 
  "19:00", "20:00", "21:00"
];

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  numberOfPeople: z.number()
    .min(1, "Number of people must be at least 1")
    .max(10, "Maximum 10 people per booking"),
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  tableNumber: z.number({
    required_error: "Please select a table",
    invalid_type_error: "Please select a valid table",
  }),
});

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableTables, setAvailableTables] = useState<TableAvailability[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid: formIsValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      numberOfPeople: 2,
      tableNumber: 0,
    },
  });

  const watchNumberOfPeople = watch('numberOfPeople', 2);
  
  useEffect(() => {
    if (selectedDate) {
      // Fetch available time slots from the backend
      const fetchAvailableTimeSlots = async () => {
        try {
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          const response = await bookingAPI.getAvailableTimeSlots(formattedDate);
          const data = response.data as TimeSlotResponse;
          const availableSlots = data.availability
            .filter(slot => slot.available)
            .map(slot => slot.timeSlot);
          
          setAvailableTimeSlots(availableSlots);
        } catch (error) {
          console.error('Error fetching available time slots:', error);
          toast.error('Failed to fetch available time slots');
          setAvailableTimeSlots([]);
        }
      };
      
      fetchAvailableTimeSlots();
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      // Fetch available tables from the backend
      const fetchAvailableTables = async () => {
        try {
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          const response = await bookingAPI.getAvailableTables(formattedDate, selectedTimeSlot);
          const data = response.data as TableAvailabilityResponse;
          
          // Filter tables that can accommodate the party size
          const suitableTables = data.tables.filter(
            table => table.seats >= watchNumberOfPeople && table.available
          );
          
          setAvailableTables(suitableTables);
        } catch (error) {
          console.error('Error fetching available tables:', error);
          toast.error('Failed to fetch available tables');
          setAvailableTables([]);
        }
      };
      
      fetchAvailableTables();
    } else {
      setAvailableTables([]);
    }
  }, [selectedDate, selectedTimeSlot, watchNumberOfPeople]);

  const onSubmit = async (data: BookingFormData) => {
    try {
      const bookingData = {
        firstName: data.firstName,
        lastName: data.lastName,
        numberOfPeople: data.numberOfPeople,
        date: format(data.date, 'yyyy-MM-dd'),
        timeSlot: data.timeSlot,
        tableNumber: data.tableNumber
      };
      
      const response = await bookingAPI.createBooking(bookingData);
      
      if (response.data) {
        toast.success('Table booked successfully!');
        navigate('/booking/confirmation', { 
          state: { booking: response.data } 
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Check if the error has a response with a message
      const errorMessage = 
        error && typeof error === 'object' && 'response' in error && 
        error.response && typeof error.response === 'object' && 'data' in error.response &&
        error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data &&
        typeof error.response.data.message === 'string'
          ? error.response.data.message as string
          : 'Failed to book table. Please try again.';
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-lemon-light">
      {/* Hero Section */}
      <div className="bg-lemon-primary text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
            Reserve a Table
          </h1>
          <p className="text-center max-w-2xl mx-auto text-lg mb-6">
            Book your dining experience at Little Lemon Restaurant. We look forward to serving you!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/bookings')}
              className="btn btn-secondary flex items-center"
            >
              View Your Bookings
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="input-field"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="input-field"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
                Number of People *
              </label>
              <input
                id="numberOfPeople"
                type="number"
                min="1"
                max="10"
                className="input-field"
                {...register('numberOfPeople', { valueAsNumber: true })}
              />
              {errors.numberOfPeople && (
                <p className="mt-1 text-sm text-red-600">{errors.numberOfPeople.message}</p>
              )}
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      setSelectedDate(date);
                      setValue('timeSlot', '');
                      setValue('tableNumber', 0);
                    }}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)}
                    placeholderText="Select a date"
                    className="input-field w-full"
                    dateFormat="MMMM d, yyyy"
                  />
                )}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div>
                <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isAvailable = availableTimeSlots.includes(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={!isAvailable}
                        className={`py-2 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none ${
                          selectedTimeSlot === time
                            ? 'bg-lemon-primary text-white'
                            : isAvailable
                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'bg-red-100 border border-red-200 text-red-400 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          setSelectedTimeSlot(time);
                          setValue('timeSlot', time, { shouldValidate: true });
                          setValue('tableNumber', 0);
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                <input 
                  type="hidden" 
                  {...register('timeSlot')} 
                  value={selectedTimeSlot} 
                />
                {errors.timeSlot && (
                  <p className="mt-1 text-sm text-red-600">{errors.timeSlot.message}</p>
                )}
              </div>
            )}

            {/* Table Selection */}
            {selectedDate && selectedTimeSlot && (
              <div>
                <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Select a Table *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                  {availableTables.map((table) => (
                    <button
                      key={table.number}
                      type="button"
                      disabled={!table.available}
                      className={`
                        relative p-4 border rounded-lg flex flex-col items-center transition-colors
                        ${
                          watch('tableNumber') === table.number
                            ? 'border-lemon-primary bg-lemon-primary bg-opacity-10'
                            : table.available
                            ? 'border-gray-300 hover:border-lemon-primary hover:bg-lemon-primary hover:bg-opacity-5'
                            : 'border-red-200 bg-red-50 cursor-not-allowed'
                        }
                      `}
                      onClick={() => {
                        setValue('tableNumber', table.number, { shouldValidate: true });
                      }}
                    >
                      <span className={`text-lg font-medium ${
                        watch('tableNumber') === table.number
                          ? 'text-lemon-primary'
                          : table.available
                          ? 'text-gray-800'
                          : 'text-red-400'
                      }`}>
                        Table {table.number}
                      </span>
                      <span className={`text-sm ${
                        watch('tableNumber') === table.number
                          ? 'text-lemon-primary'
                          : table.available
                          ? 'text-gray-500'
                          : 'text-red-300'
                      }`}>
                        {table.seats} seats
                      </span>
                      {table.available ? (
                        watch('tableNumber') === table.number && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-5 w-5 text-lemon-primary" />
                          </div>
                        )
                      ) : (
                        <div className="absolute top-2 right-2">
                          <X className="h-5 w-5 text-red-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <input 
                  type="hidden" 
                  {...register('tableNumber', { valueAsNumber: true })} 
                />
                {errors.tableNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.tableNumber.message}</p>
                )}

                {watchNumberOfPeople > 6 && (
                  <p className="mt-2 text-sm text-amber-600">
                    <span className="font-bold">Note:</span> For parties larger than 6, you may need to book multiple tables.
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formIsValid}
                className="w-full btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking your table...
                  </span>
                ) : (
                  'Book Table'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;