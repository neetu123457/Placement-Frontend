import { useAuth } from "../context/AuthContext";

const Profile = () => {

  const { user } = useAuth();

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Profile</h1>
          <p>
            Manage your profile information.
          </p>
        </div>

      </div>

      <div className="dashboard-card profile-card">

        <div className="large-avatar">
          {user?.name
            ?.charAt(0)
            .toUpperCase() || "U"}
        </div>

        <h2>
          {user?.name || "Student"}
        </h2>

        <p>
          {user?.email || "student@example.com"}
        </p>

        <p>
          Placement Preparation Student
        </p>

      </div>

    </div>
  );
};

export default Profile;