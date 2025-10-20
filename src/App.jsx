import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* If not logged in, show login/signup */}
      {!user ? (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/topics/*" element={<Topics />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      )}
    </Routes>
  );
}
