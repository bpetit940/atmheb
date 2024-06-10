// src/components/ATM.tsx

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUser, withdraw, deposit } from '../utils/dataService';
import Login from './Login';
import Register from './Register';
import AccountBalance from './AccountBalance';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import { Container, Typography, Box, Button, Paper } from '@mui/material';

interface User {
    user_id: number;
    pin: number;
    account_balance: number;
    withdrawal_limit: number;
    withdrawals?: { date: string; amount: number }[];
}

const ATM: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState<string>('');
    const [pin, setPin] = useState<number | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (pin: number) => {
        try {
            const userData = await getUser(pin);
            if (userData.pin === pin) {
                setUser(userData);
                setPin(pin);
                setMessage('');
                navigate('/account-balance');
            } else {
                setMessage('Invalid PIN');
            }
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    const handleRegister = () => {
        setIsRegistering(false);
    };

    const handleWithdraw = async (new_balance: number) => {
        if (user) {
            setUser({ ...user, account_balance: new_balance });
            setMessage('Withdrawal successful.');
            navigate('/thank-you');
        }
    };

    const handleDeposit = async (new_balance: number) => {
        if (user) {
            setUser({ ...user, account_balance: new_balance });
            setMessage('Deposit successful.');
            navigate('/thank-you');
        }
    };

    const logOut = () => {
        setUser(null);
        setPin(null);
        navigate('/');
    };

    if (!user) {
        return isRegistering ? (
            <Register onRegister={handleRegister} onSwitchToLogin={() => setIsRegistering(false)} />
        ) : (
            <Login onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} message={message} />
        );
    }

    return (
        <Routes>
            <Route path="/account-balance" element={<AccountBalance user={user} onLogOut={logOut} />} />
            <Route path="/withdraw" element={<Withdraw user={user} pin={pin!} onWithdraw={handleWithdraw} onLogOut={logOut} />} />
            <Route path="/deposit" element={<Deposit user={user} pin={pin!} onDeposit={handleDeposit} onLogOut={logOut} />} />
            <Route path="/thank-you" element={
                <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            Your operation is complete. Thank You!
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {message}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/account-balance')}>
                                Back to Account Balance
                            </Button>
                            <Button variant="contained" color="secondary" onClick={logOut}>
                                Log Out
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            } />
        </Routes>
    );
};

export default ATM;
