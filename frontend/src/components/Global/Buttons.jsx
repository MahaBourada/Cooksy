import React from "react";

export const IconButton = ({ icon, label, bgColor, type, onClick }) => {
  return (
    <div
      className="flex items-center bg-secondary
      } text-black text-xl h-12 py-1 px-5 rounded-full shadow-custom-box hover:translate-x-[1px] hover:translate-y-[1px] hover:opacity-80 hover:shadow-none"
      style={{ backgroundColor: bgColor ? bgColor : "#8cb369" }}
    >
      {icon}
      <button className="px-2" type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export const NoIconButton = ({
  label,
  type,
  bgColor,
  borderColor,
  onClick,
}) => {
  return (
    <div
      className={`flex justify-center items-center ${bgColor} text-black text-xl w-fit h-11 py-1 px-4 m-2 ${
        borderColor ? "border-black border-2" : "border-none"
      } rounded-full shadow-custom-box hover:translate-x-[1px] hover:translate-y-[1px] hover:opacity-80 hover:shadow-none`}
    >
      <button className="px-2" type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export const BigButton = ({ label, type }) => {
  return (
    <button
      className="flex justify-center items-center bg-secondary text-black text-xl w-full h-[3.5rem] py-4 px-4 rounded-[16px] shadow-custom-box hover:translate-x-[1px] hover:translate-y-[1px] hover:opacity-80 hover:shadow-none"
      type={type}
    >
      {label}
    </button>
  );
};
