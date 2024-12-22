import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface AuthLayoutProps {
    children: React.ReactNode;
    toggleTheme: () => void;
    isDarkMode: boolean;
}

export const AuthLayout = ({ children, toggleTheme, isDarkMode }: AuthLayoutProps) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Task management
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <main style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                {children}
            </main>
        </div>
    );
};
