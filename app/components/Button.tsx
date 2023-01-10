import React from "react";

function Button({ label, type }: { label: string; type: string }) {
  return (
    <button
      type={type}
      className="mx-3 mr-auto rounded-2xl bg-black py-2 px-5 font-medium text-white shadow-md shadow-gray-400 ring-black transition-all duration-75 hover:bg-yellow-400 hover:text-black hover:ring-2"
    >
      {label}
    </button>
  );
}

export default Button;
