import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import PSDLOGO from '../../assets/images/home/PDS-Logo.png';
import SATLOGO from '../../assets/images/home/SAT-Logo.png';
import HomeBg from '../../assets/images/home/home-bg.png';
import { ColorTranslator } from 'colortranslator';
import ScreenShot0NFT from '../../assets/images/home/Screen-Shot-0-NFT.jpg';
import ScreenShot1NFT from '../../assets/images/home/Screen-Shot-1-NFT.jpg';
import ScreenShot2NFT from '../../assets/images/home/Screen-Shot-2-NFT.jpg';
import ScreenShot3NFT from '../../assets/images/home/Screen-Shot-3-NFT.png';
import ScreenShot4NFT from '../../assets/images/home/Screen-Shot-4-NFT.jpg';
import BEYONDNFTsv2 from '../../assets/images/home/BEYOND-NFTs-v2.png';
import { useScreenMediaQuery } from '../../utils/MediaQuery';

const useStyles = makeStyles(() => ({
    homePage: {
        marginRight: -40,
        marginLeft: -40,
        marginBottom: -30,
        marginTop: -43,
        position: 'relative',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 96,
        color: Colors.dark,
        marginBottom: 15,
        marginTop: 110,
        position: 'relative',
        zIndex: 1,
    },
    subtitle: {
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 18,
    },
    dIBlock: {
        display: 'inline-block',
    },
    satLogo: {
        position: 'relative',
        top: 10,
        left: 26,
    },
    psdLogoWrap: {
        marginLeft: 10,
    },
    divider: {
        backgroundColor: new ColorTranslator(Colors.dark).setA(0.2).RGBA,
        marginBottom: 51,
    },
    dividerWrap: {
        width: '100%',
        position: 'relative',
        zIndex: 2,
    },
    dividerWrapDesc: {
        width: 'calc(100% - 110px)',
    },
    images: {
        marginBottom: 45,
    },
    imagesDesc: {
        position: 'relative',
        marginBottom: 85,
        height: 384,
    },
    imagesGrid: {
        justifyContent: 'center',
    },
    imagesGridDesc: {
        marginLeft: 60,
    },
    imagesGridItem: {
        position: 'relative',
        '&:nth-child(2n+1)': {
            marginTop: 38,
        },
    },
    imagesText: {
        color: Colors.black,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 17,
    },
    imagesTextWrapDesc: {
        position: 'relative',
        left: -35,
    },
    imagesTextWrap: {
        position: 'relative',
        left: -15,
    },
    imagesLogo: {
        width: 117,
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(15px, 20px)',
    },
    imagesLogoDesc: {
        transform: 'translate(42px, 20px)',
    },
    homePageImages: {
        paddingTop: '126px !important',
    },
}));

const HomePageBackground = styled.div`
    background: url('${HomeBg}') no-repeat;
    background-size: contain;
    transform: translate(-195px, -261px);
    width: 391px;
    height: 406px;
    position: absolute;
    left: 0;
    top: 0;
`;

const HomePageImages = styled.div`
    height: 100%;
    width: 100%;
    z-index: 1;
    position: relative;
    padding-top: 64px;
`;

type ImagesTextWrapProps = {
    left: number;
    top: number;
};

const ImagesTextWrap = styled.div<ImagesTextWrapProps>`
    background: rgba(196, 196, 196, 0.2);
    width: 252px;
    height: 343px;
    position: absolute;
    left: ${(props) => props.left}px;
    top: ${(props) => props.top}px;
    padding: 8px;
`;

type ImagesProps = {
    img: string;
};

const Images = styled.div<ImagesProps>`
    width: 262px;
    height: 343px;
    background: url(${(props) => props.img}) no-repeat;
    background-size: cover;
    background-position: center;
`;

const imagesList = [ScreenShot0NFT, ScreenShot1NFT, ScreenShot2NFT, ScreenShot3NFT, ScreenShot4NFT];
const imagesTextList = ['FLEXIBLE LICENSING MODELS', 'DEEP ROYALTY TREES', 'CERTIFICATIONS'];

const HomePage: FC = () => {
    const classes = useStyles();
    const screenMedium = useScreenMediaQuery('md');
    const screenSmall = useScreenMediaQuery('sm');
    const isIpad = screenMedium || screenSmall;
    const isWrap = isIpad ? 'wrap' : 'nowrap';
    return (
        <section className={classes.homePage}>
            <HomePageBackground />
            <Typography variant="h1" className={classes.title}>
                WELCOME
                <span className={classes.dIBlock}>
                    <img src={SATLOGO} className={classes.satLogo} alt="SAT" width={90} />
                </span>
                <span className={`${classes.dIBlock} ${classes.psdLogoWrap}`}>
                    <img src={PSDLOGO} alt="PSD" width={114} />
                </span>
            </Typography>
            <div className={`${classes.dividerWrap} ${!isIpad ? classes.dividerWrapDesc : undefined}`}>
                <img
                    src={BEYONDNFTsv2}
                    className={`${classes.imagesLogo} ${!isIpad ? classes.imagesLogoDesc : undefined}`}
                    alt="BEYOND-NFTs-v2"
                />
                <Divider className={classes.divider} />
            </div>
            <div className={`${classes.images} ${!isIpad ? classes.imagesDesc : undefined}`}>
                <div className={`${!isIpad ? classes.imagesTextWrapDesc : classes.imagesTextWrap}`}>
                    {imagesTextList.map((text: string, index: number) => (
                        <ImagesTextWrap key={text} left={index * 35} top={index * 35}>
                            <Typography variant="h3" className={classes.imagesText}>
                                {text}
                            </Typography>
                        </ImagesTextWrap>
                    ))}
                </div>
                <HomePageImages className={`${isIpad ? classes.homePageImages : undefined}`}>
                    <Grid
                        container
                        wrap={isWrap}
                        className={`${!isIpad ? classes.imagesGridDesc : classes.imagesGrid}`}
                        spacing={2}
                    >
                        {imagesList.map((img: string) => (
                            <Grid key={img} item className={`${!isIpad ? classes.imagesGridItem : undefined}`}>
                                <Images img={img} />
                            </Grid>
                        ))}
                    </Grid>
                </HomePageImages>
            </div>
            <Typography variant="subtitle2" className={classes.subtitle}>
                Simply create SATs with flexibile licensing models, certifications and deep royalty trees, and easily
                integrate it all into your existing applications and web platforms
            </Typography>
        </section>
    );
};

export default HomePage;
