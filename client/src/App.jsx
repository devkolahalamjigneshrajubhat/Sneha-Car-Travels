import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Booking from './pages/Booking';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/" element={<MainPage scrolled={scrolled} />} />
      </Routes>
    </Router>
  );
}

function MainPage({ scrolled }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrolled={scrolled} />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

function BookingPage() {
  const location = useLocation();
  const service = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Booking service={service} />
    </div>
  );
}

export default App;