import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist";
// import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
};

export default App;
