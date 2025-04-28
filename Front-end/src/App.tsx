import LandingPage from './pages/LandingPage/LandingPage'
import {Routes, Route} from 'react-router-dom'
import HotelListing from './pages/SearchPage/HotelListing'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import Account from './pages/Account/Account'
import Member from './pages/MemberPage/Member'
import Login from './pages/LogInPage/Login'
import Payment from './pages/PaymentPage/Payment'
import BookingPage from './pages/BookingPage/BookingPage'
import BookedPage from './pages/BookedPage/BookedPage'
import { Navigate } from 'react-router-dom'

function App() {
  const isLoggedIn = !!localStorage.getItem('userId'); // Check if userId exists
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
          path="/search"
          element={isLoggedIn ? <HotelListing /> : <Navigate to="/Login" />}
        />
        <Route
          path="/search/:location"
          element={isLoggedIn ? <HotelListing /> : <Navigate to="/Login" />}
        />
      <Route path='/Details' element={<DetailsPage />} />
      <Route path='/Account' element={<Account />} />
      < Route path='/Member' element={< Member/>}/>
      <Route path='/Login' element={<Login />} />
      <Route path='/Payment' element={<Payment />} />
      <Route path='/Booking' element={<BookingPage />} />
      <Route path='/Booked' element={<BookedPage />} />
    </Routes>
    </>
  )
};

export default App;