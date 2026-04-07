import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiUser, FiCalendar, FiMapPin, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi';

const WHATSAPP_NUMBER = '918143844844';

export default function Booking({ service: propService }) {
  const location = useLocation();
  const navigate = useNavigate();
  const service = propService || location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.age.trim()) {
      toast.error('Please enter your age');
      return false;
    }
    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      toast.error('Please enter a valid age (18-100)');
      return false;
    }
    if (!formData.gender) {
      toast.error('Please select your gender');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (!formData.pickupLocation.trim()) {
      toast.error('Please enter pickup location');
      return false;
    }
    if (!formData.dropLocation.trim()) {
      toast.error('Please enter drop location');
      return false;
    }
    if (!formData.date.trim()) {
      toast.error('Please enter travel date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const message = `Hello Sneha Car Travels,

I would like to book the following service:

🚗 Service: ${service.serviceName || 'Custom'}
💰 Price: ${service.price || 'Custom'}

👤 Name: ${formData.name}
🎂 Age: ${formData.age}
⚧ Gender: ${formData.gender}
📞 Phone: ${formData.phone}
📍 Pickup: ${formData.pickupLocation}
🏁 Drop: ${formData.dropLocation}
📅 Date: ${formData.date}
📝 Message: ${formData.message || 'N/A'}

Please confirm my booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          pickupLocation: formData.pickupLocation,
          dropLocation: formData.dropLocation,
          date: formData.date,
          message: `Service: ${service.serviceName || 'Custom'} | Age: ${formData.age} | Gender: ${formData.gender} | ${formData.message}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Booking submitted! Opening WhatsApp...');
        setFormData({
          name: '',
          age: '',
          gender: '',
          phone: '',
          pickupLocation: '',
          dropLocation: '',
          date: '',
          message: '',
        });
        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 1200);
      } else {
        toast.error(data.message || 'Something went wrong');
        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 1200);
      }
    } catch (err) {
      toast.error('Opening WhatsApp...');
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-primary to-primarydark p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Book Your Ride</h1>
            <p className="text-white/80 mt-2">Fill in the details below to book your car</p>
          </div>

          {service.serviceName && (
            <div className="bg-amber-50 border-l-4 border-primary p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">Selected Service</p>
                  <p className="text-lg font-semibold text-gray-900">{service.serviceName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiPhone className="inline w-4 h-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiMapPin className="inline w-4 h-4 mr-1" />
                  Pickup Location *
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiMapPin className="inline w-4 h-4 mr-1" />
                  Drop Location *
                </label>
                <input
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  placeholder="Enter drop location"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FiCalendar className="inline w-4 h-4 mr-1" />
                Travel Date *
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g., 15th April 2026"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FiMessageSquare className="inline w-4 h-4 mr-1" />
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special requirements or requests..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primarydark text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 text-lg"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Submit & Book on WhatsApp
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}