import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiEdit2, FiLoader } from 'react-icons/fi';
import ReviewForm from './ReviewForm';

const defaultReviews = [
  {
    name: 'Rajesh Kumar',
    location: 'Vijayawada',
    rating: 5,
    message: 'Excellent service! The driver was very professional and the car was clean. Highly recommended for anyone looking for reliable car rentals in Vijayawada.',
  },
  {
    name: 'Praveen Reddy',
    location: 'Hyderabad',
    rating: 5,
    message: 'Booked for Vijayawada to Hyderabad drop. Smooth journey, on-time pickup and drop. Will definitely use again for future trips.',
  },
  {
    name: 'Srinivas Rao',
    location: 'Vijayawada',
    rating: 5,
    message: 'Great experience with Sneha Car Travels. Affordable pricing and excellent customer service. My go-to taxi service now!',
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [useDefault, setUseDefault] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      if (data.success && data.reviews.length > 0) {
        setReviews(data.reviews);
        setUseDefault(false);
      } else {
        setReviews(defaultReviews);
        setUseDefault(true);
      }
    } catch (err) {
      setReviews(defaultReviews);
      setUseDefault(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <FiLoader className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.message}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            <FiEdit2 className="w-5 h-5" />
            Leave a Review
          </button>
        </motion.div>
      </div>

      <ReviewForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
}