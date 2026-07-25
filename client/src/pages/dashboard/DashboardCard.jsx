import CountUp from "react-countup";

export default function DashboardCard({ title, value, icon, color }) {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      border
      border-slate-200
      hover:shadow-xl
      hover:-translate-y-1
      duration-300
      "
    >
      <div className="flex justify-between">
        <div>
          <p className="text-slate-500">{title}</p>

          <h2 className="text-4xl font-bold mt-3">
            <CountUp end={value} duration={2} />
          </h2>
        </div>

        <div
          className={`

          w-16

          h-16

          rounded-2xl

          flex

          items-center

          justify-center

          text-white

          ${color}

          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
