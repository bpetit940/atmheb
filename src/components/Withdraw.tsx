import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Stack } from '@mui/material';
import { withdraw } from '../utils/dataService';
import { useNavigate } from 'react-router-dom';

interface WithdrawProps {
    user: {
        user_id: number;
        account_balance: number;
        withdrawal_limit: number;
    };
    pin: number;
    onWithdraw: (new_balance: number) => void;
    onLogOut: () => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ user, pin, onWithdraw, onLogOut }) => {
    const [amount, setAmount] = useState<number | ''>('');
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    
    const handleWithdraw = async () => {
        if (typeof amount !== 'number') {
            setMessage('Invalid amount');
            return;
        }
        try {
            const result = await withdraw(user.user_id, pin, amount);
            onWithdraw(result.new_balance);
            setMessage('Thank you! Withdrawal successful.');
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Withdraw</Typography>
                <Typography variant="h6" gutterBottom>Daily Withdrawal Limit: ${user.withdrawal_limit}</Typography>
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    margin="normal"
                    fullWidth
                />
                <Stack gap={2}>
                    <Button variant="contained" color="primary" onClick={handleWithdraw} sx={{ mt: 2 }}>
                        Withdraw
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

export default Withdraw;
