import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { TableBooking } from '../types';
import { bookingAPI } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState<TableBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<TableBooking | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch your bookings');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCancelClick = (booking: TableBooking) => {
    setSelectedBooking(booking);
    setShowConfirmDialog(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedBooking) return;

    try {
      await bookingAPI.cancelBooking(selectedBooking?._id as string);
      toast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setShowConfirmDialog(false);
      setSelectedBooking(null);
    }
  };

  const formatBookingInfo = (booking: TableBooking) => {
    const date = format(new Date(booking.date), 'MMMM d, yyyy');
    return `Table ${booking.tableNumber} on ${date} at ${booking.timeSlot}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-lemon-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lemon-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-lemon-light">
        {/* Hero Section */}
        <div className="bg-lemon-primary text-white py-16">
          <div className="container-custom">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
              Your Bookings
            </h1>
            <p className="text-center max-w-2xl mx-auto text-lg mb-6">
              Manage your table reservations at Little Lemon Restaurant
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/booking')}
                className="btn btn-secondary flex items-center"
              >
                Book Another Table
              </button>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">You don't have any bookings yet.</p>
                <button
                  onClick={() => navigate('/booking')}
                  className="btn btn-primary"
                >
                  Make a Reservation
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-medium text-gray-900">
                          Table {booking.tableNumber}
                        </h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>Date: {format(new Date(booking.date), 'MMMM d, yyyy')}</p>
                          <p>Time: {booking.timeSlot}</p>
                          <p>Guests: {booking.numberOfPeople}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">

                        <button
                          onClick={() => handleCancelClick(booking)}
                          className="btn btn-danger flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Cancel Booking"
        message={selectedBooking ? `Are you sure you want to cancel your reservation for ${formatBookingInfo(selectedBooking)}?` : ''}
        confirmLabel="Yes, Cancel Booking"
        cancelLabel="No, Keep Booking"
        onConfirm={handleCancelConfirm}
        onCancel={() => {
          setShowConfirmDialog(false);
          setSelectedBooking(null);
        }}
      />
    </>
  );
};

export default UserBookingsPage; 