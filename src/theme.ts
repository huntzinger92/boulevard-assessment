import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: '#45205e',
        },
        background: {
            default: '#ebe4f0',
            paper: '#f5f2f7',
        },
    },
});

export default theme;
