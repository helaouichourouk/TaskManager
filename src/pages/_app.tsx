import * as React from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react';
import { lightTheme, darkTheme } from '../../theme';
import "@/styles/globals.css";
import '@fontsource/roboto';
import { Layout } from '../components/Layout';
import { AuthLayout } from '../components/AuthLayout';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const isAuthPage = ['/login', '/create-account', '/forgot-password'].includes(router.pathname);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: `${theme.palette.background.default} !important`,
            color: `${theme.palette.text.primary} !important`,
          },
        }}
      />

      {isAuthPage ? (
        <AuthLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <Component {...pageProps} />
        </Layout>
      )}
    </MuiThemeProvider>
  );
}
