import React, { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, tooltip }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  return (
    <div className="relative">
      <button
        onMouseOver={() => setIsTooltipVisible(true)}
        onMouseOut={() => setIsTooltipVisible(false)}
        onClick={onClick}
        className="w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md flex items-center justify-center"
      >
        {icon}
      </button>
      {isTooltipVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white opacity-100 bg-gray-800 rounded whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Button;
