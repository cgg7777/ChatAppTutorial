import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
        });
    });
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ChatPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
