import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import UserBookingsPage from './pages/UserBookingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="booking" element={<BookingPage />} />
            <Route path="booking/confirmation" element={<BookingConfirmationPage />} />
            <Route path="bookings" element={<UserBookingsPage />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
      
      <Toaster position="top-center" toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
    </>
  );
}

export default App;