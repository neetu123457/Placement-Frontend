import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/useAuth";

const Navbar = () => {

  const { user } = useAuth();

  return (
    <header className="navbar">

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-button">
          <Bell size={20} />
        </button>

        <div className="profile-mini">

          <div className="avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <strong>
              {user?.name || "Student"}
            </strong>

            <small>
              Student
            </small>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;