import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AccountBalanceProps {
    user: {
        account_balance: number;
    };
    onLogOut: () => void;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ user, onLogOut }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Account Balance</Typography>
                <Typography variant="h6" gutterBottom>Account Balance: ${user.account_balance}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/withdraw')}>
                        Withdraw
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate('/deposit')}>
                        Deposit
                    </Button>
                </Box>
                <Button variant="contained" color="secondary" onClick={onLogOut} sx={{ mt: 3 }}>
                    Log Out
                </Button>
            </Paper>
        </Container>
    );
};

export default AccountBalance;
