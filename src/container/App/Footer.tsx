import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Colors, { ColorTranslator } from '../../constants/Colors';
import Logo from '../../assets/images/big-logo.png';

const StyleFooter = styled.footer`
    background-color: ${Colors.primary};
    color: ${Colors.white};
    padding-top: 5px;
    width: 100%;
    margin-top: auto;
    box-shadow: 0 4px 5px ${new ColorTranslator(Colors.dark).setA(0.14).RGBA},
        0 1px 10px ${new ColorTranslator(Colors.dark).setA(0.12).RGBA},
        0 2px 4px ${new ColorTranslator(Colors.dark).setA(0.2).RGBA};
`;

const useStyles = makeStyles(() =>
    createStyles({
        copyrightBlock: {
            textAlign: 'center',
        },
        copyrightText: {
            fontSize: 10,
            lineHeight: '20px',
            letterSpacing: 0.5,
            color: Colors.whiteLight,
        },
        textRight: {
            textAlign: 'right',
            textShadow: '0 4px 4px ' + new ColorTranslator(Colors.dark).setA(0.25).RGBA,
        },
        action: {
            display: 'flex',
            flexDirection: 'column',
        },
        actionLink: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            display: 'inline-block',
            fontSize: 14.8,
            lineHeight: '20px',
            color: Colors.whiteLight,
            letterSpacing: '0.15px',
            textDecoration: 'none',
            '&:hover': {
                color: Colors.white,
            },
        },
        grid: {
            marginBottom: 0,
        },
    }),
);

const Footer: FC = () => {
    const classes = useStyles();
    return (
        <StyleFooter>
            <Container maxWidth="xl">
                <Grid container spacing={3} alignItems="flex-end" className={classes.grid}>
                    <Grid item xs={4} className={classes.grid}>
                        <div>
                            <a
                                href="http://doc.dase.io"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={classes.actionLink}
                            >
                                Home
                            </a>
                            <br />
                            <a
                                href="https://www.personaldigitalspaces.com"
                                rel="noopener noreferrer"
                                target="_blank"
                                className={classes.actionLink}
                            >
                                Visit Personal Digital Spaces
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={4} className={`${classes.copyrightBlock} ${classes.grid}`}>
                        <img src={Logo} alt="PDS | Serialized Asset Tokens" width="100" />
                        <Typography variant="subtitle1" className={classes.copyrightText}>
                            Copyright © 2021 Personal Digital Spaces. <br /> All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.grid} />
                </Grid>
            </Container>
        </StyleFooter>
    );
};

export default Footer;
