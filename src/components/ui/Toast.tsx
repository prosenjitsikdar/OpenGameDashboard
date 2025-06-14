import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          background: 'bg-green-50 border-green-500',
          icon: <CheckCircle className="text-green-500" size={20} />,
          textColor: 'text-green-800'
        };
      case 'error':
        return {
          background: 'bg-red-50 border-red-500',
          icon: <AlertCircle className="text-red-500" size={20} />,
          textColor: 'text-red-800'
        };
      case 'info':
        return {
          background: 'bg-blue-50 border-blue-500',
          icon: <Info className="text-blue-500" size={20} />,
          textColor: 'text-blue-800'
        };
      default:
        return {
          background: 'bg-gray-50 border-gray-500',
          icon: <Info className="text-gray-500" size={20} />,
          textColor: 'text-gray-800'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className={`${styles.background} border-l-4 p-4 rounded-lg shadow-lg flex items-start max-w-md`}>
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className={`ml-3 ${styles.textColor}`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 -mr-1 -mt-1 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;