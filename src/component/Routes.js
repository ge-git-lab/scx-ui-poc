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
import CopySubsBucAddition from '../pages/CopySubsBucAddition';

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/copysubs/subleveldqremediation" element={<SubLevelDqRemediation />} />
            <Route path="/copysubs/copysubscontactaddition" element={<CopySubsContactAddition />} />
            <Route path="/copysubs/copysubsbankaddition" element={<CopySubsBankAddition />} />
            <Route path="/copysubs/copysubstax" element={<CopySubsTax />} />
            <Route path="/copysubs/copysubsscopedetails" element={<CopySubsScopeDetails />} />
            <Route path="/copysubs/copysubsdqapproval" element={<CopySubsDQApproval />} />
            <Route path="/copysubs/copysubsbucaddition" element={<CopySubsBucAddition />} />
        </Routes>
    );
};

export default AppRoutes;
