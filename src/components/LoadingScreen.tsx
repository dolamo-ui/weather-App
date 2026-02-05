import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

interface LoadingScreenProps {
  theme: 'light' | 'dark';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme }) => {
  const bgClass = theme === 'dark' ? 'bg-[#121212]' : 'bg-slate-50';

  return (
    <div className={`h-screen w-screen flex items-center justify-center ${bgClass}`}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-blue-400"
      >
        <Sun size={64} />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;