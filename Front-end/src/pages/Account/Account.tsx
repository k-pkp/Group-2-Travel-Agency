import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ProfileHeader from "./ProfileHeader";
import AccountTabs from "./Details/AccountTabs";
import AccountDetails from "./Details/AccountDetails";
import Booking from "./Booking/Booking";
import PaymentMethods from "./PaymentMethods/PaymentMethods";

type Tab = "Account" | "History" | "Payment methods";

const Account = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<Tab>("Account");
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const tabParam = params.get("tab");
  
      if (tabParam === "payments") setActiveTab("Payment methods");
      else if (tabParam === "history") setActiveTab("History");
      else setActiveTab("Account");
    }, [location.search]);
  
    const handleTabChange = (tab: Tab) => {
      setActiveTab(tab);
    };

    interface User {
      Name: string;
      UserType: string;
      email: string; // Add other properties as needed
      PasswordHash: string;
      PhoneNumber: string;
      Address: string;
      DateOfBirth: string;
    }
    
    const [userData, setUserData] = useState<User>(); // State to store single user data
      // Fetch user data for admin check
      useEffect(() => {
        const storedUserId = localStorage.getItem('userId'); // Get it again right before the fetch
        console.log('useEffect (fetch /user) - userId to send:', storedUserId);
        if (storedUserId) {
          fetch("http://localhost:8081/user", {
            method: 'GET',
            headers: {
              'user-id': storedUserId,
            },
          })
    
            .then((res) => res.json())
            .then(data => {
              console.log('Fetched User Data:', JSON.stringify(data, null, 2)); // You already have this
    
              // --- Verify the data here ---
              if (data && data.length > 0) {
                const user = data[0];
                console.log('Received User Object:', user);
                console.log('Received User Type:', user.UserType);
    
                // Set your isAdmin state based on the UserType
                setUserData(user); // You are already doing this
    
                // --- Further checks based on your user data structure ---
                // Example: If you expect an email:
                console.log('Received User Email:', user.email);
                // Add checks for other properties you expect
    
              } else {
                console.log('No user data received or data array is empty.');
                // Handle this case (e.g., user not found on the backend)
              }
            })
            .catch((error) => console.error("Error fetching users:", error));
        } else {
          console.log('useEffect (fetch /user) - No userId found, skipping fetch.');
        }
      }, []);
        
  return (
    <div className="bg-[rgba(250,251,252,1)] flex flex-col overflow-hidden items-stretch min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center">
      {userData && <ProfileHeader name={userData.Name} mail={userData.email}/>}

        <div className="w-full flex flex-col items-center">
          <AccountTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {activeTab === "Account" && userData && <AccountDetails name={userData.Name} email={userData.email} password={userData.PasswordHash} phone={userData.PhoneNumber} address={userData.Address} dob={userData.DateOfBirth}/>}

          {activeTab === "History" && <Booking></Booking>}

          {activeTab === "Payment methods" && <PaymentMethods></PaymentMethods>}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
