// src/components/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../pages/Home';
import SubLevelDqRemediation from '../pages/SubLevelDqRemediation';
import CopySubsContactAddition from '../pages/CopySubsContactAddition';
import CopySubsTax from '../pages/CopySubsTax';
import CopySubsBankAddition from '../pages/CopySubsBankAddition';
import CopySubsScopeDetails from '../pages/CopySubsScopeDetails';
import CopySubsDQApproval from '../pages/CopySubsDQApproval';

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/copysubs/copysubscontactaddition" element={<SubLevelDqRemediation />} />
            <Route path="/copysubs/subleveldqremediation" element={<CopySubsContactAddition />} />
            <Route path="/copysubs/copysubsbankaddition" element={<CopySubsBankAddition />} />
            <Route path="/copysubs/copysubstax" element={<CopySubsTax />} />
            <Route path="/copysubs/copysubsscopedetails" element={<CopySubsScopeDetails />} />
            <Route path="/copysubs/copysubsdqapproval" element={<CopySubsDQApproval />} />
        </Routes>
    );
};

export default AppRoutes;