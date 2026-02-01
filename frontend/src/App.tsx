import DashboardAll from "./pages/DashboardAll"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home";
import DashboardLayout from "./DashboardLayout";
import DashboardType from "./pages/DashboardType";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardAll/>} />
          <Route path=":type" element={<DashboardType />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App