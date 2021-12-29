import { useField } from "formik";

// TODO: show error message
export default function TextField({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <label>
        {label}
        <input
          className="mb-5 rounded border-2 border-solid border-red-600"
          {...field}
          {...props}
        />
      </label>
    </div>
  );
}
