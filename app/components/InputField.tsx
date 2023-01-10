function InputField({
  label,
  name,
  value,
  type,
  required,
}: {
  label: string;
  value: string;
  name: string;
  type: string;
  required: boolean;
}) {
  return (
    <div className="mb-6">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
      />
    </div>
  );
}

export default InputField;
