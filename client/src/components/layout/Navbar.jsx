import { FaBell, FaBars } from "react-icons/fa";

function Navbar({ setOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="
bg-white
shadow
p-4
flex
items-center
justify-between

sticky
top-0
z-40
"
    >
      {/* Mobile Menu Button */}

      <button
        className="
lg:hidden
text-xl
"
        onClick={() => setOpen(true)}
      >
        <FaBars />
      </button>

      <h2
        className="
text-lg
sm:text-xl
lg:text-2xl
font-semibold
"
      >
        Digital Employee Portal
      </h2>

      <div
        className="
flex
items-center
gap-3
sm:gap-6
"
      >
        <FaBell size={20} />

        <div
          className="
hidden
sm:block
"
        >
          <h4 className="font-semibold">{user?.name}</h4>

          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        <img
          src="https://i.pravatar.cc/40"
          className="
rounded-full
w-9
h-9
"
        />
      </div>
    </div>
  );
}

export default Navbar;
