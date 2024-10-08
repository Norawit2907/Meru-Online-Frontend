import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import Homes from "./styles/Home.css";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar";
import Watpage2 from './pages/Watpage2.jsx'
import EditWat from "./pages/EditWat.jsx";

const App = () => {
  return (
    <Router>
      <div className="w-full h-screen overflow-x-hidden">
        <Navbar />
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/result" element={<Result />} />
            <Route path="/watpage2" element={<Watpage2/>} />
            <Route path="/editwat" element={<EditWat></EditWat>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
    
  );
};

export default App;
