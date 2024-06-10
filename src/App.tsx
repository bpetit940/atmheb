// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ATM from './components/ATM';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<ATM />} />
            </Routes>
        </Router>
    );
}

export default App;
