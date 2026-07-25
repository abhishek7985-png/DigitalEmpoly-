import {
  FaUsers,
  FaHome,
  FaClipboardList,
  FaCar,
  FaBus,
  FaFileAlt,
  FaLaptop,
  FaIdCard,
  FaChartBar,
  FaBell,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { name: "Employees", icon: <FaUsers />, path: "/employees" },
  { name: "Pre Joining", icon: <FaClipboardList />, path: "/prejoining" },
  { name: "Accommodation", icon: <FaCar />, path: "/accommodation" },
  { name: "Transport", icon: <FaBus />, path: "/transportation" },
  { name: "Documents", icon: <FaFileAlt />, path: "/documents" },
  { name: "IT Assets", icon: <FaLaptop />, path: "/itassets" },
  { name: "ID Card", icon: <FaIdCard />, path: "/idcard" },
  { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
  { name: "Notifications", icon: <FaBell />, path: "/notification" },
];

function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`
fixed top-0 left-0 z-50
h-screen w-72
bg-slate-900 text-white
flex flex-col
transform transition-transform duration-300

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
    >
      {/* Close Mobile */}

      <div className="lg:hidden absolute right-4 top-4">
        <button onClick={() => setOpen(false)}>
          <FaTimes size={22} />
        </button>
      </div>

      {/* Logo */}

      <div
        className="
text-center
py-6
border-b
border-slate-700
"
      >
        <h1 className="text-2xl font-bold">HRMS Portal</h1>

        <p className="text-sm text-gray-300">Employee Onboarding</p>
      </div>

      {/* Menu */}

      <div
        className="
flex-1
overflow-y-auto
mt-5
"
      >
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `
flex items-center
gap-4
px-6
py-3

text-base
lg:text-lg

hover:bg-slate-700

${isActive ? "bg-blue-600" : ""}
`
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}

      <div
        className="
border-t
border-slate-700
p-4
"
      >
        <button
          className="
w-full
py-3
bg-red-600
rounded-lg
hover:bg-red-700
"
        >
          <FaSignOutAlt className="inline mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
