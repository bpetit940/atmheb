import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Stack } from '@mui/material';
import { deposit } from '../utils/dataService';
import { useNavigate } from 'react-router-dom';

interface DepositProps {
    user: {
        user_id: number;
        account_balance: number;
    };
    pin: number;
    onDeposit: (new_balance: number) => void;
    onLogOut: () => void;
}

const Deposit: React.FC<DepositProps> = ({ user, pin, onDeposit, onLogOut }) => {
    const [amount, setAmount] = useState<number | ''>('');
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleDeposit = async () => {
        if (typeof amount !== 'number') {
            setMessage('Invalid amount');
            return;
        }
        try {
            const result = await deposit(user.user_id, pin, amount);
            onDeposit(result.new_balance);
            setMessage('Thank you! Deposit successful.');
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Deposit</Typography>
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    margin="normal"
                    fullWidth
                />
                <Stack gap={2}>
                    <Button variant="contained" color="primary" onClick={handleDeposit} sx={{ mt: 2 }}>
                        Deposit
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate('/account-balance')}>
                        Back to Account Balance
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onLogOut} sx={{ mt: 2 }}>
                        Log Out
                    </Button>
                </Stack>
                {message && <Typography color="error" variant="body1" mt={2}>{message}</Typography>}
            </Paper>
        </Container>
    );
};

export default Deposit;
