import React from 'react';

function Checkbox({ children, type = "checkbox", className = "", ...props }) {
  const isRadio = type === "radio";

  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type={type}
          className={`sr-only peer ${className}`}
          {...props}
        />

        {/* Checkbox customizado */}
        {!isRadio && (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus:ring-2 peer-focus:ring-blue-200 peer-focus:ring-offset-2 transition-all duration-200 group-hover:border-blue-400">
            <svg
              className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Radio button customizado */}
        {isRadio && (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-focus:ring-2 peer-focus:ring-blue-200 peer-focus:ring-offset-2 transition-all duration-200 group-hover:border-blue-400">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></div>
          </div>
        )}
      </div>

      <span className="ml-3 select-none">{children}</span>
    </label>
  );
}

export default Checkbox;
