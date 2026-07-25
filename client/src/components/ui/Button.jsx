export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
