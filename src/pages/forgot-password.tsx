// pages/forgot-password.tsx
import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Link } from '@mui/material';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setMessage(responseData.message || 'Check your email for instructions');
                setLoading(false);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to send reset instructions');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during forgot password:', error);
            setMessage('An error occurred while trying to send the reset instructions.');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" component="h1" align="center">
                    Forgot Password
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{
                        padding: 1.5,
                        fontSize: '1rem',
                    }}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                {message && (
                    <Typography variant="body2" sx={{ mt: 2, color: message.includes('Check') ? 'green' : 'red' }}>
                        {message}
                    </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Link href="/login" variant="body2">
                        Remember your password? Login
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
