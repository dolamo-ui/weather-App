import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { ThemeStyles } from '../types';

interface PermissionModalProps {
  show: boolean;
  onClose: () => void;
  onAllow: () => void;
  themeStyles: ThemeStyles;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ 
  show, 
  onClose, 
  onAllow, 
  themeStyles 
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md p-8 rounded-[2.5rem] ${themeStyles.surface} border ${themeStyles.border} shadow-2xl text-center`}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sky-500/10 flex items-center justify-center">
              <MapPin className="text-sky-500" size={32} />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Enable Location Access</h2>
            <p className={`mb-8 ${themeStyles.textSecondary}`}>
              Allow Aether to access your location for accurate weather forecasts in your area.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={onAllow}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all shadow-lg"
              >
                Allow Location Access
              </button>
              <button 
                onClick={onClose}
                className={`w-full py-4 rounded-2xl ${themeStyles.bg} border ${themeStyles.border} font-semibold hover:bg-white/5 transition-all`}
              >
                Search City Manually
              </button>
            </div>
            
            <p className={`mt-6 text-xs ${themeStyles.textSecondary}`}>
              You can search for any city using the search bar
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


export default PermissionModal;
