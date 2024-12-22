// pages/signup.tsx
import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Link } from '@mui/material';
import { useRouter } from 'next/router';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/create-account', { // Change the API route here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                // Redirect user to login or dashboard
                router.push('/login');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred while trying to sign up.');
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
                    Create Account
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
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        padding: 1.5,
                        fontSize: '1rem',
                    }}
                >
                    Sign Up
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Link href="/login" variant="body2">
                        Already have an account? Login
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;
