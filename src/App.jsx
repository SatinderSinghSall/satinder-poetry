import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/poems/:id" element={<PoemDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}
