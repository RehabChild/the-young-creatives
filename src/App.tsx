import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminBookings from './admin/pages/Bookings';
import AdminMessages from './admin/pages/Messages';
import AdminServices from './admin/pages/Services';
import AdminPortfolio from './admin/pages/Portfolio';
import AdminTestimonials from './admin/pages/Testimonials';

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="portfolio" element={<AdminPortfolio />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<SiteLayout />} />
      </Routes>
    </AdminAuthProvider>
  );
}
