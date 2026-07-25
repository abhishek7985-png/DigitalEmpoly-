export default function ActivityCard() {
  const activity = [
    "Rahul joined IT Department",

    "Neha uploaded documents",

    "Laptop assigned to Aman",

    "ID Card Generated",

    "Payroll Completed",
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-bold text-xl mb-6">Recent Activities</h2>

      <div className="space-y-5">
        {activity.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
