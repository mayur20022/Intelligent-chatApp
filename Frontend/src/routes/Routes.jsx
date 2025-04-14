import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Home from '../screen/Home';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
