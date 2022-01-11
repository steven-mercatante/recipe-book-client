interface Props {
  children: React.ReactChild;
}

export default function ContentContainer({ children }: Props) {
  return (
    <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">{children}</div>
  );
}
