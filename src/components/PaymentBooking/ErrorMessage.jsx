import { AlertCircle } from "lucide-react";
import React from "react";

const ErrorMessage = ({ message }) => (
  message && (
    <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-2 text-red-200">
      <AlertCircle size={18} />
      <p>{message}</p>
    </div>
  )
);

export default ErrorMessage;