import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

interface LoginProps {
    onLogin: (pin: number) => void;
    onSwitchToRegister: () => void;
    message?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister, message }) => {
    const [pin, setPin] = useState<number | ''>('');

    const handleLogin = () => {
        if (typeof pin === 'number') {
            onLogin(pin);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                    <Typography variant="h4" gutterBottom>ATM Login</Typography>
                    <TextField
                        label="PIN"
                        type="number"
                        value={pin}
                        onChange={(e: { target: { value: string; }; }) => setPin(parseInt(e.target.value))}
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 3 }}>
                        Login
                    </Button>
                    {message && <Typography color="error" variant="body1" mt={2}>{message}</Typography>}
                    <Button color="secondary" onClick={onSwitchToRegister} sx={{ mt: 1 }}>
                        Create Account
                    </Button>
                </Box>
            </Paper>
        </Container>

    );
};

export default Login;
