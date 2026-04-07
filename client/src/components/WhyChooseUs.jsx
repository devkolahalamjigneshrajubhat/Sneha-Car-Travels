import { motion } from 'framer-motion';
import { FiStar, FiUser, FiTool, FiDollarSign, FiClock, FiHeart } from 'react-icons/fi';

const features = [
  {
    icon: <FiStar className="w-7 h-7" />,
    title: '5-Star Rated',
    description: 'Highly rated by hundreds of satisfied customers across Vijayawada',
  },
  {
    icon: <FiUser className="w-7 h-7" />,
    title: 'Professional Drivers',
    description: 'Experienced and courteous drivers with excellent driving skills',
  },
  {
    icon: <FiTool className="w-7 h-7" />,
    title: 'Well-Maintained Vehicles',
    description: 'Regularly serviced and clean vehicles for your comfort and safety',
  },
  {
    icon: <FiDollarSign className="w-7 h-7" />,
    title: 'Affordable Pricing',
    description: 'Competitive rates with no hidden charges or surprise fees',
  },
  {
    icon: <FiClock className="w-7 h-7" />,
    title: '24/7 Service',
    description: 'Available round the clock for your travel needs anytime',
  },
  {
    icon: <FiHeart className="w-7 h-7" />,
    title: 'Customer First',
    description: 'Your satisfaction is our top priority with personalized service',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are committed to providing the best car travel experience in Vijayawada
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-primary to-primarydark rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-10" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Book Your Ride?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Contact us now on WhatsApp for instant booking and exclusive offers!
            </p>
            <a
              href="https://wa.me/918143844844?text=Hi%20I%20want%20to%20book%20a%20car"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}