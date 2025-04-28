// UserProfileDropdown.tsx
"use client";
import { useNavigate } from "react-router-dom";

// Define the props for the UserProfileDropdown component
interface UserProfileDropdownProps {
  user: any | null; // Adjust type as needed
  onClose: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onClose,
}) => {
  // Handle the logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login after logout
  };

  const navigate = useNavigate();

    // Handle click on the "Profile" button
  const handleProfileClick = () => {
    onClose();
    navigate("/account"); // Redirect to user profile page (if you have one)
  };

  return (
    // The dropdown menu container with absolute positioning, styling, and shadow
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-100">
      <div className="py-2">
        {user && (
          <div className="px-4 py-2 text-sm text-gray-700">
            Logged in as:{" "}
            <span className="font-semibold">{user.username || user.email}</span>
          </div>
        )}
        <button
          onClick={handleProfileClick}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
