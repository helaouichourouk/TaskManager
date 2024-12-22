import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    AppBar,
    Typography,
    IconButton,
    Button,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const drawerWidth = 240;

export const Layout = ({
    children,
    toggleTheme,
    isDarkMode,
}: {
    children: React.ReactNode;
    toggleTheme: () => void;
    isDarkMode: boolean;
}) => {
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* AppBar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Task management
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer (Sidebar) */}
            <Drawer
                variant={isSmallScreen ? 'temporary' : 'persistent'}
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                sx={{
                    width: isSmallScreen ? 'auto' : drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Home', 'About', 'Contact', 'Settings'].map((text) => (
                            <ListItemButton key={text}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: isSmallScreen ? 0 : -10,
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
