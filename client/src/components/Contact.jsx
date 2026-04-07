import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';

const WHATSAPP_NUMBER = '918143844844';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
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

I would like to book a car.

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📍 Pickup: ${formData.pickupLocation}
🏁 Drop: ${formData.dropLocation}
📅 Date: ${formData.date}
📝 Message: ${formData.message || 'N/A'}

Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Booking submitted! Opening WhatsApp...');
        setFormData({
          name: '',
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
      toast.error('Opening WhatsApp directly...');
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Address',
      details: 'Bhavanipuram, Vijayawada',
      subtitle: 'Andhra Pradesh',
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91 81438 44844',
      subtitle: 'Call or WhatsApp',
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Hours',
      details: '24 Hours',
      subtitle: 'Available every day',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Book your ride or get in touch with us for any inquiries
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
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
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any special requirements..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primarydark text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    'Submitting...'
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Submit Booking
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sneha Car Travels,\n\nI would like to book a car.\n\nPlease provide available options.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FiCheckCircle className="w-5 h-5" />
                Quick Book on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {infoItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-900 font-medium">{item.details}</p>
                  <p className="text-gray-500">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}

            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Our Location
              </h4>
              <div className="rounded-xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38215.789032!2d80.6302!3d16.5428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a036b5f1b1b1b1b%3A0x1b1b1b1b1b1b1b1!2sBhavanipuram%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}