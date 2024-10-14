
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import Homes from "./styles/Home.css";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar";
import Watpage1 from './pages/Watpage1.jsx'
import Watpage2 from './pages/Watpage2.jsx'
import EditWat from "./pages/EditWat.jsx";
import Booking from "./pages/Booking.jsx";

const App = () => {
  return (
    <Router>
      <div className="w-full h-full  ">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/result" element={<Result />} />
            <Route path="/watpage1" element={<Watpage1/>} />
            <Route path="/watpage1/:id" element={<Watpage1/>} />
            <Route path="/watpage2" element={<Watpage2/>} />
            <Route path="/editwat" element={<EditWat/>}></Route>
            <Route path="/booking" element={<Booking/>} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
};

export default App;

