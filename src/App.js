import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                navigate("/");
            } else {
                navigate("/login");
            }
        });
    }, []);
    return (
        // <Router>
        <Routes>
            <Route exact path="/" element={<ChatPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
        // </Router>
    );
}

export default App;
