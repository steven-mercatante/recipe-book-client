import { useField } from "formik";

interface Props {
  label: string;
}

// TODO: show error
export default function TextField({ label, ...props }: Props) {
  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <label htmlFor={props.name}>
        <strong>{label}</strong>
      </label>
      <input
        className="block mb-5 rounded border-2 w-full"
        {...field}
        {...props}
        id={props.name}
      />
    </div>
  );
}
