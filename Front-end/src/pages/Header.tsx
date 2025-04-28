// Header.tsx
"use client";

import { useState, useEffect } from "react";
import UserProfileDropdown from "./UserProfileDropdown";

 // Define the Header functional component
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null); // Adjust type as needed

  // useEffect hook to handle side effects (runs on component mount)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
        localStorage.removeItem('user'); // Clear invalid data
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Function to toggle the dropdown menu open/close
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex justify-between items-center px-10 py-5 max-sm:p-4 bg-white drop-shadow-lg z-50 relative">
      <nav className="flex gap-5 items-center">
        <span className="text-base text-zinc-900">Find Stays with</span>
        <a href="/">
          <h1 className="text-2xl font-semibold text-zinc-900 text-center">
            Travelok<span className="text-[#8DB1D3]">è</span>
          </h1>
        </a>
      </nav>

      <div className="relative">
        {isLoggedIn ? (
          // Render the user profile dropdown if the user is logged in
          <>
            <button
              className="w-10 h-10 rounded-full cursor-pointer bg-slate-200 overflow-hidden"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-label="User profile menu"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.username || "User profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full font-semibold text-zinc-900">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </button>
            {isDropdownOpen && <UserProfileDropdown user={user} onClose={() => setIsDropdownOpen(false)} />}
          </>
        ) : (
          // Render the login button if the user is not logged in
          <button
            className="px-4 py-2 rounded-md bg-[#8DB1D3] text-white font-semibold cursor-pointer"
            onClick={() => window.location.href = "/login"} // Assuming /login is your login route
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
}

// Export the Header component for use in other parts of the app
export default Header;
