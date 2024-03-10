import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom';
import Subscriptions from "./pages/Subscriptions";
import Settings from "./pages/Settings";
import Login from "./pages/Auth/Login.";
import SignUp from "./pages/Auth/SignUp";
import { Toaster } from "react-hot-toast";

const App = () => {


  return (
    <>
    <Navbar/>
    <Toaster />
    <Routes>
      <Route path="/subscriptions" element={<Subscriptions />}/>
      <Route path="/settings" element={<Settings />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
    </>
  )
}

export default App
