import React from "react";

function Button({
  label,
  type,
  loading,
}: {
  label: string;
  type: string;
  loading: boolean;
}) {
  return (
    <button
      disabled={loading}
      type={type}
      className="mx-3 rounded-2xl bg-black py-2 px-5 text-sm font-medium text-white shadow-md shadow-gray-400 ring-black transition-all duration-75 hover:bg-yellow-400 hover:text-black hover:ring-2"
    >
      {label}
    </button>
  );
}

export default Button;
