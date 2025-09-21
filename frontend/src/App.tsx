import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </>
  );
}
