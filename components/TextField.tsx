import { useField } from "formik";

interface Props {
  label: string;
}

// TODO: show error
export default function TextField({ label, ...props }: Props) {
  console.log(">>> props:", props);
  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input
        className="block mb-5 rounded border-2 border-solid border-red-600"
        {...field}
        {...props}
        id={props.name}
      />
    </div>
  );
}
