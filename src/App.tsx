import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom';
import Subscriptions from "./pages/Subscriptions";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Login from "./pages/Auth/Login.";
import SignUp from "./pages/Auth/SignUp";
import { Toaster } from "react-hot-toast";
import { Container } from '@mui/material';
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

const App = () => {


  return (
    <>
      <Navbar />
      <Toaster />
      <Container component="main" sx={{ marginTop: {xs: '64px', sm: '80px'} }}>
        <Routes>
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Container>
    </>
  )
}

export default App
