import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { addUser } from '../utils/dataService';

interface RegisterProps {
    onSwitchToLogin: () => void;
    onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
    const [pin, setPin] = useState<number | ''>('');
    const [accountBalance, setAccountBalance] = useState<number | ''>('');
    const [withdrawalLimit, setWithdrawalLimit] = useState<number | ''>('');
    const [message, setMessage] = useState<string>('');

    const handleRegister = async () => {
        if (
            typeof pin === 'number' &&
            typeof accountBalance === 'number' &&
            typeof withdrawalLimit === 'number'
        ) {
            try {
                await addUser({
                    user_id: 0,
                    pin: pin,
                    account_balance: accountBalance,
                    withdrawal_limit: withdrawalLimit,
                    withdrawals: []
                });
                setMessage('User registered successfully');
                onRegister()
            } catch (error: any) {
                setMessage(error.message);
            }
        } else {
            setMessage('All fields are required');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" gutterBottom>Create Account</Typography>
                <TextField
                    label="PIN"
                    type="number"
                    value={pin}
                    onChange={(e: { target: { value: string; }; }) => setPin(parseInt(e.target.value))}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Account Balance"
                    type="number"
                    value={accountBalance}
                    onChange={(e: { target: { value: string; }; }) => setAccountBalance(parseInt(e.target.value))}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Withdrawal Limit"
                    type="number"
                    value={withdrawalLimit}
                    onChange={(e: { target: { value: string; }; }) => setWithdrawalLimit(parseInt(e.target.value))}
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 3 }}>
                    Register
                </Button>
                <Button color="primary" variant='contained' onClick={onSwitchToLogin} sx={{ mt: 1 }}>
                    Back to Login
                </Button>
                {message && <Typography color="error" mt={2}>{message}</Typography>}
            </Box>
            </Paper>
        </Container>
    );
};

export default Register;
