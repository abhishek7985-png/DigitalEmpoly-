export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm border border-slate-200 ${className}`}
    >
      {children}
    </div>
  );
}
