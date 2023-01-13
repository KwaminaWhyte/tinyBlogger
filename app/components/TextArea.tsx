import React from "react";

const TextArea = ({
  name,
  label,
  defaultValue,
  onChange,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="mt-4 mb-4 flex flex-col">
      <label htmlFor="name" className="font-bold">
        {label}
      </label>

      <textarea
        name={name}
        value={defaultValue}
        onChange={onChange}
        className="h-40 rounded-2xl border  border-purple-300 pt-2 pb-2 pl-4 pr-4 outline-none transition-all duration-200 focus:shadow-sm focus:shadow-purple-400 focus:outline-none active:outline-none"
      ></textarea>
    </div>
  );
};

export default TextArea;
