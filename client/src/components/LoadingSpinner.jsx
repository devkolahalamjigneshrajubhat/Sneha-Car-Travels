import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 border-4 border-gray-700 border-t-primary rounded-full mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-white mb-2">
          Sneha Car Travels
        </h1>
        <p className="text-gray-400">Loading...</p>
      </motion.div>
    </div>
  );
}