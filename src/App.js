import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/user/Login";
import "./App.css";
import Task from "./components/task/Task";
import Register from "./components/user/Register";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

function App() {
  return (
    <div className="flex flex-col bg-slate-300 min-h-screen h-fit mx-auto">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/task" element={<Task />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </div>
  );
}

export default App;
