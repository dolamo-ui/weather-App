import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { ThemeStyles } from '../types';

interface ToastProps {
  message: string;
  onClose: () => void;
  themeStyles: ThemeStyles;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, themeStyles }) => {
  if (!message) return null;

  const isSuccess = message.startsWith('✓');
  const borderColor = isSuccess ? 'border-green-500/50' : 'border-red-500/50';
  const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 z-50 max-w-md"
      >
        <div className={`p-4 rounded-2xl ${themeStyles.surface} border ${borderColor} shadow-xl flex items-center gap-3`}>
          {isSuccess ? (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          ) : (
            <AlertCircle className={`${iconColor} flex-shrink-0`} size={20} />
          )}
          <p className="text-sm">{message.replace('✓ ', '')}</p>
          <button 
            onClick={onClose}
            className={`ml-auto hover:opacity-75 transition-opacity ${iconColor}`}
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;