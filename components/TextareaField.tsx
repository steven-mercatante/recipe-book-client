import { FieldHookConfig, useField } from "formik";

interface Props {
  label: string;
}

// TODO: show error message
export default function TextareaField({ label, ...props }: Props) {
  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <label>
        {label}
        <textarea
          className="mb-5 rounded w-10/12 h-72 border-2 border-solid border-red-600"
          {...field}
          {...props}
        />
      </label>
    </div>
  );
}
