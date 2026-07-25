import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiFileText,
  FiCheckSquare,
  FiTruck,
  FiPackage,
  FiCreditCard,
  FiShield,
  FiHelpCircle,
  FiBarChart2,
  FiBell,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useState } from "react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome />,
    },

    {
      title: "Employees",
      path: "/employees",
      icon: <FiUsers />,
    },

    {
      title: "Pre Joining",
      path: "/prejoining",
      icon: <FiCheckSquare />,
    },

    {
      title: "Documents",
      path: "/documents",
      icon: <FiFileText />,
    },

    {
      title: "Accommodation",
      path: "/accommodation",
      icon: <FiPackage />,
    },

    {
      title: "Transport",
      path: "/transportation",
      icon: <FiTruck />,
    },

    {
      title: "IT Assets",
      path: "/itassets",
      icon: <FiCreditCard />,
    },

    {
      title: "ID Card",
      path: "/idcard",
      icon: <FiCreditCard />,
    },

    {
      title: "Policies",
      path: "/policy",
      icon: <FiShield />,
    },

    {
      title: "Help Center",
      path: "/helpcenter",
      icon: <FiHelpCircle />,
    },

    {
      title: "Analytics",
      path: "/analytics",
      icon: <FiBarChart2 />,
    },

    {
      title: "Notifications",
      path: "/notification",
      icon: <FiBell />,
    },
  ];

  return (
    <div
      className="
min-h-screen
bg-gray-100
flex
overflow-hidden
"
    >
      {/* Overlay Mobile */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
fixed
inset-0
bg-black/40
z-20
lg:hidden
"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
fixed
lg:static

top-0
left-0

z-30

h-screen

flex
flex-col


bg-gradient-to-b
from-indigo-950
via-blue-900
to-blue-700


text-white

transition-all
duration-300


${sidebarOpen ? "translate-x-0" : "-translate-x-full"}


lg:translate-x-0


${collapsed ? "lg:w-20" : "lg:w-72"}


w-72

`}
      >
        {/* Logo */}

        <div
          className="
h-20
flex
items-center
justify-between

px-5

border-b
border-white/20

flex-shrink-0
"
        >
          {!collapsed && (
            <div>
              <h1
                className="
text-xl
font-bold
"
              >
                Digital HRMS
              </h1>

              <p
                className="
text-xs
text-blue-200
"
              >
                Employee Onboarding Portal
              </p>
            </div>
          )}

          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="
hover:bg-white/10
p-2
rounded-lg
"
          >
            {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Menu */}

        <nav
          className="
flex-1

overflow-y-auto

mt-5

px-3

pb-5

scrollbar-hide

"
        >
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `

flex
items-center
gap-4

px-4
py-3

mb-2

rounded-xl

transition-all


${
  isActive
    ? "bg-white text-blue-800 shadow-lg"
    : "hover:bg-white/10 text-blue-100"
}

`
              }
            >
              <span
                className="
text-xl
"
              >
                {menu.icon}
              </span>

              {!collapsed && (
                <span
                  className="
font-medium
"
                >
                  {menu.title}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}

        <div
          className="
p-3

border-t

border-white/20

flex-shrink-0

"
        >
          <button
            onClick={logout}
            className="
w-full

flex

items-center

justify-center

gap-3


bg-red-500

hover:bg-red-600


py-3

rounded-xl

transition

"
          >
            <FiLogOut />

            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}

      <div
        className="
flex-1
min-w-0

h-screen

overflow-y-auto
"
      >
        {/* Navbar */}

        <header
          className="
h-20

bg-white

shadow-sm

flex

items-center

justify-between


px-4

lg:px-8

sticky

top-0

z-10

"
        >
          <button
            className="
lg:hidden

p-2

rounded-lg

hover:bg-gray-100
"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={25} />
          </button>

          <div>
            <h2
              className="
font-bold

text-lg

sm:text-xl

text-gray-800

"
            >
              Employee Onboarding Portal
            </h2>

            <p
              className="
text-sm
text-gray-500

hidden
sm:block
"
            >
              Manage complete employee journey
            </p>
          </div>

          <div
            className="
flex
items-center
gap-3
"
          >
            <div
              className="
hidden
sm:block
text-right
"
            >
              <p
                className="
font-semibold
"
              >
                HR Admin
              </p>

              <p
                className="
text-xs
text-gray-500
"
              >
                Administrator
              </p>
            </div>

            <img
              src="https://ui-avatars.com/api/?name=HR+Admin"
              className="
w-10
h-10

sm:w-12
sm:h-12

rounded-full

border-2
border-blue-500

"
            />
          </div>
        </header>

        <main
          className="
p-4

lg:p-8

"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
