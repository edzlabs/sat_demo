import React, { FC, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PrivateRoute from '../../hooks/PrivateRoute';
import Colors from '../../constants/Colors';
import GlobalStyle from '../../createGlobalStyle';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
const GalleryPage = lazy(() => import('../../pages/GalleryPage'));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1342,
        },
    },
});

const useStyles = makeStyles(() => ({
    container: {
        paddingLeft: 66,
        paddingRight: 66,
    },
    main: {
        width: '100%',
        marginBottom: 68,
    },
    wrap: {
        display: 'flex',
        flexWrap: 'nowrap',
        height: '100vh',
        flexDirection: 'column',
    },
}));

const App: FC = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.wrap}>
                <GlobalStyle />
                <Router>
                    <Header />
                    <main className={classes.main}>
                        <Container maxWidth="xl" className={classes.container}>
                            <Switch>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Route path="/" component={HomePage} exact />
                                    <PrivateRoute component={GalleryPage} path="/gallery" exact />
                                </Suspense>
                            </Switch>
                        </Container>
                    </main>
                    <Footer />
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;
