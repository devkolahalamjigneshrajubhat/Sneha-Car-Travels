import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiEdit2, FiLoader } from 'react-icons/fi';
import ReviewForm from './ReviewForm';

// ✅ Move BASE_URL outside component (better practice)
const BASE_URL = import.meta.env.VITE_API_URL || "https://sneha-car-travels.onrender.com";

const defaultReviews = [
  {
    name: 'Rajesh Kumar',
    location: 'Vijayawada',
    rating: 5,
    message: 'Excellent service! The driver was very professional and the car was clean.',
  },
  {
    name: 'Praveen Reddy',
    location: 'Hyderabad',
    rating: 5,
    message: 'Smooth journey, on-time pickup and drop. Will definitely use again.',
  },
  {
    name: 'Srinivas Rao',
    location: 'Vijayawada',
    rating: 5,
    message: 'Affordable pricing and excellent customer service.',
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [useDefault, setUseDefault] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/reviews`);

      // ✅ Handle backend not responding properly
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      if (data.success && data.reviews?.length > 0) {
        setReviews(data.reviews);
        setUseDefault(false);
      } else {
        setReviews(defaultReviews);
        setUseDefault(true);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
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
    fetchReviews(); // refresh after submit
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Real reviews from our happy customers
          </p>
        </motion.div>

        {/* LOADING */}
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
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                {/* STARS */}
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="text-primary fill-current" />
                  ))}
                </div>

                {/* MESSAGE */}
                <p className="text-gray-600 mb-6 italic">
                  "{review.message}"
                </p>

                {/* USER */}
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(true)}
            className="text-primary font-semibold hover:underline"
          >
            <FiEdit2 className="inline mr-2" />
            Leave a Review
          </button>
        </div>
      </div>

      {/* REVIEW FORM */}
      <ReviewForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
}