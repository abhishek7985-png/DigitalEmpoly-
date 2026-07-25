export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-slate-500">{subtitle}</p>
      </div>

      {action}
    </div>
  );
}
