// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Container, Link } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Store the JWT token in localStorage (or cookies)
                localStorage.setItem('token', data.token);

                // Redirect user to the dashboard or another page
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while trying to log in.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 4 }}>
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
                    Login
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
                    Login
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Link href="/signup" variant="body2">
                        Create an account
                    </Link>
                    <Link href="/forgot-password" variant="body2">
                        Forgot password?
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
