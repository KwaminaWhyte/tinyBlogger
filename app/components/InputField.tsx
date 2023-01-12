function InputField({
  label,
  name,
  value = "",
  type,
  required,
  error = "",
}: {
  label: string;
  value?: string;
  name: string;
  type: string;
  required: boolean;
}) {
  return (
    <div className="mb-6">
      <label
        className="mb-2 block text-base font-semibold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`w-full appearance-none rounded-2xl border p-3 text-base font-medium leading-tight text-gray-700 focus:outline-none focus:ring-2 ${
          error != ""
            ? "border-red-500 ring-2 ring-red-400"
            : "border-gray-700 ring-slate-400"
        }`}
        id={name}
        name={name}
        type={type}
        required={required}
        // value={value}
      />
    </div>
  );
}

export default InputField;
