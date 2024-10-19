import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, required = false }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm text-white">{label} :</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="
          border 
          border-gray-500
          focus:border-[#AD957B] 
          focus:ring-[#AD957B] 
          rounded-lg 
          bg-[#2D2D2E]
          p-2 
          w-full 
          text-gray-300
          transition 
          duration-200 
          ease-in-out
          shadow-sm
          focus:outline-none
        "
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default InputField;
