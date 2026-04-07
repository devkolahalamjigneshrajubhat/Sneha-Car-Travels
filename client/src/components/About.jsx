import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiClock } from 'react-icons/fi';

const features = [
  {
    icon: <FiStar className="w-6 h-6" />,
    title: '5-Star Rated',
    description: 'Highly rated by hundreds of happy customers',
  },
  {
    icon: <FiMapPin className="w-6 h-6" />,
    title: 'Local Experts',
    description: 'Best knowledge of Vijayawada and surrounding areas',
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: '24/7 Service',
    description: 'Available round the clock for your convenience',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Sneha Car Travels
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Trusted Car Rental Service in Vijayawada
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Sneha Car Travels is a trusted and highly rated car rental service in Vijayawada, 
              offering safe, reliable, and affordable travel solutions for all your needs. 
              Whether you need a taxi for local trips or outstation travel, we provide 
              well-maintained vehicles with professional drivers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We specialize in Vijayawada to Hyderabad drops, temple trips, and special 
              packages. Our commitment to customer satisfaction and safety has made us 
              one of the most preferred car travel services in the region.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-primary">
                <FiStar className="w-5 h-5 fill-current" />
                <span className="font-semibold">5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <FiClock className="w-5 h-5" />
                <span className="font-semibold">24/7 Available</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}