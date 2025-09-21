import { Link, useNavigate } from "react-router-dom";
import { LogOut, Users, UserPlus, Briefcase } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <Briefcase size={28} className="text-white" />
          <span className="font-bold text-xl">EMS</span>
        </div>

        {/* Navbar */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/employees"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <Users size={18} />
            <span>Employees</span>
          </Link>

          <Link
            to="/add-employee"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <UserPlus size={18} />
            <span>Add Employee</span>
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/signup"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <UserPlus size={18} />
              <span>Signup</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}