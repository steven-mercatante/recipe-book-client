import { FieldHookConfig, useField } from "formik";

interface Props {
  label: string;
}

// TODO: show error message
export default function TextareaField({ label, ...props }: Props) {
  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <textarea
        className="block mb-5 rounded w-fit h-72 border-2 border-solid border-red-600"
        {...field}
        {...props}
        id={props.name}
      />
    </div>
  );
}
