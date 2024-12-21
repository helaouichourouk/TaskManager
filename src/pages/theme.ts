import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff', // Fond clair
        },
        text: {
            primary: '#000000', // Texte noir
        },
    },
    typography: {
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1c1a1a', // Fond sombre
        },

    },
    typography: {
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
});
