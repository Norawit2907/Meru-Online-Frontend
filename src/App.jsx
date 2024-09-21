import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar";
import Watpage from "./pages/Watpage.jsx";

const App = () => {
  return (
    <Router>
      <div className="w-full h-screen overflow-x-hidden">
        <Navbar />
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watpage" element={<Watpage/>} />
          </Routes>
        </main>
      </div>
    </Router>
    
  );
};

export default App;
