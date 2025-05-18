import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { TableBooking } from '../types';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking as TableBooking;

  // Redirect if no booking information is available
  useEffect(() => {
    if (!booking) {
      navigate('/booking');
    }
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  // Format the date from "2023-05-25" to "May 25, 2023"
  const formattedDate = format(new Date(booking.date), 'MMMM d, yyyy');

  return (
    <div className="min-h-screen bg-lemon-light">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Success Header */}
            <div className="bg-green-500 py-6 px-8 text-white text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold font-heading">Booking Confirmed!</h1>
              <p className="mt-2 text-lg">Your table has been successfully reserved.</p>
            </div>

            {/* Booking Details */}
            <div className="p-8">
              <h2 className="text-2xl font-heading font-bold mb-6 text-center">
                Reservation Details
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-lemon-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-lemon-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Guest Information</h3>
                    <div className="mt-2 text-gray-600">
                      <p className="font-medium">{booking.firstName} {booking.lastName}</p>
                      <p>Party of {booking.numberOfPeople}</p>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-lemon-primary/10 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-lemon-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Date & Time</h3>
                    <div className="mt-2 text-gray-600">
                      <p>{formattedDate}</p>
                      <p>{booking.timeSlot}</p>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-lemon-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-lemon-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Table Information</h3>
                    <div className="mt-2 text-gray-600">
                      <p>Table #{booking.tableNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <p className="text-center text-gray-600 mb-6">
                  A confirmation email has been sent to your email address.
                </p>

                <div className="bg-lemon-primary/5 border border-lemon-primary/20 rounded-lg p-4 mb-8">
                  <p className="text-sm text-lemon-dark">
                    <span className="font-medium">Note:</span> If you need to cancel or modify your reservation, 
                    please contact us at least 2 hours before your scheduled time at (123) 456-7890.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Link to="/" className="btn btn-primary">
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;