import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Homes from "./styles/Home.css";
import Navbar from "./components/Navbar";
import Watpage1 from "./pages/Watpage1.jsx";
import Watpage2 from './pages/Watpage2.jsx'
import EditWat from "./pages/EditWat.jsx";
import Booking from "./pages/Booking.jsx";



const App = () => {
  return (
    <Router>
      <div className="w-full h-screen overflow-x-hidden">
        <Navbar />
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watpage1" element={<Watpage1/>} />
            <Route path="/watpage2" element={<Watpage2/>} />
            <Route path="/editwat" element={<EditWat></EditWat>}></Route>
            <Route path="/booking" element={<Booking></Booking>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
    
  );
};

export default App;
