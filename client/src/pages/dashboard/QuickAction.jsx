import { UserPlus, Upload, BadgePlus, Laptop } from "lucide-react";

export default function QuickAction() {
  const actions = [
    {
      title: "Add Employee",
      icon: <UserPlus />,
    },

    {
      title: "Upload Docs",
      icon: <Upload />,
    },

    {
      title: "Generate ID",
      icon: <BadgePlus />,
    },

    {
      title: "Assign Asset",
      icon: <Laptop />,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-bold text-xl mb-5">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item, index) => (
          <button
            key={index}
            className="

rounded-2xl

border

p-5

hover:bg-blue-600

hover:text-white

duration-300

"
          >
            <div className="flex flex-col items-center gap-3">
              {item.icon}

              <p>{item.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
