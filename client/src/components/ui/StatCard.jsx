import CountUp from "react-countup";

export default function StatCard({ title, value, icon, bg }) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      p-6
      text-white
      shadow-xl
      hover:scale-105
      transition-all
      duration-300
      cursor-pointer
      "
      style={{ background: bg }}
    >
      <div className="absolute -right-5 -top-5 w-28 h-28 rounded-full bg-white/10"></div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-white/80 text-sm uppercase tracking-wider">
            {title}
          </p>

          <h1 className="text-4xl font-bold mt-3">
            <CountUp end={value} duration={2} />
          </h1>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex justify-center items-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
