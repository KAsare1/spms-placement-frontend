import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import Rules from "./pages/Rules";
import Choices from "./pages/Choices";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/choices" element={<Choices />} />
      </Routes>
    </Router>
  );
}

export default App;
