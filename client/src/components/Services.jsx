import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMap, FiDollarSign, FiCalendar } from 'react-icons/fi';

const services = [
  {
    title: 'Vijayawada → Hyderabad Drop',
    price: '₹5,800',
    priceValue: 5800,
    description: 'One-way drop to Hyderabad with experienced driver',
    icon: <FiMap className="w-8 h-8" />,
  },
  {
    title: 'Vadapalli Temple Trip',
    price: '₹5,500',
    priceValue: 5500,
    description: 'Full day trip to Vadapalli Temple with return',
    icon: <FiMap className="w-8 h-8" />,
  },
  {
    title: 'Pancharamalu Package',
    price: '₹8,000',
    priceValue: 8000,
    description: 'Visit all 5 temples in one day package',
    icon: <FiMap className="w-8 h-8" />,
  },
];

export default function Services() {
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    navigate('/booking', {
      state: {
        serviceName: service.title,
        price: service.price,
        priceValue: service.priceValue,
      },
    });
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our range of reliable and affordable car rental services
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-primary to-primarydark p-8 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white/80 text-sm">{service.description}</p>
              </div>
              <div className="p-8">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-gray-900">{service.price}</span>
                  <span className="text-gray-500">/trip</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Professional driver
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    AC vehicle
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Door-to-door service
                  </li>
                </ul>
                <button
                  onClick={() => handleBookNow(service)}
                  className="w-full bg-primary hover:bg-primarydark text-white py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiDollarSign className="w-5 h-5" />
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Need a custom package? We also offer customized tours!
          </p>
          <button
            onClick={() => {
              navigate('/booking', {
                state: {
                  serviceName: 'Custom Package',
                  price: 'Custom',
                  priceValue: 0,
                },
              });
            }}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <FiCalendar className="w-5 h-5" />
            Request Custom Package
          </button>
        </motion.div>
      </div>
    </section>
  );
}