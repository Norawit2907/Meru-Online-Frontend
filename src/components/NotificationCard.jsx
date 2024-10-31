import React from 'react';
import { X } from 'lucide-react';

const NotificationCard = ({ title, date, ondel }) => {
  return (
    <div className="p-4 sm:p-3 flex justify-between items-start group transition-all duration-200">
      <div className="flex-grow pr-4 sm:pr-2">
        <p className="text-[16px] sm:text-[14px] text-[#AD957B] font-medium mb-1 leading-tight line-clamp-2">
          {title}
        </p>
        <p className="text-[12px] sm:text-[11px] text-gray-400">
          {date}
        </p>
      </div>
      <button
        onClick={ondel}
        className="mt-1 p-1.5 rounded-full 
          sm:opacity-100 opacity-0 group-hover:opacity-100 
          hover:bg-[#3A3A3A] transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-[#AD957B] focus:ring-opacity-50"
        aria-label="Delete notification"
      >
        <X className="w-5 h-5 sm:w-4 sm:h-4 text-gray-400 hover:text-[#AD957B] transition-colors duration-200" />
      </button>
    </div>
  );
};

export default NotificationCard;