// src/components/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Courses from '../pages/Courses';

const AppRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
