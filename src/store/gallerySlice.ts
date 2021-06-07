import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { Login } from '../services/api/Auth';
import { getUserListAssets } from '../services/api/Assets';
import { LoginProps } from '../services/api/Interface';

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        tileData: [],
        isLogin: false,
        isLoginError: false,
        userName: '',
        isLoadTileData: false,
        /**
         * Server selection option
         */
        serverName: '',

        singlePageTagId: '',
        /**
         * DabId single template selection parameter
         */
        singlePage: '',
        /**
         * user's crypto key
         */
        user: {
            userId: '',
            prvKey: '',
            pubKey: '',
        },
    },
    reducers: {
        changeServerName: (state, action): void => {
            state.serverName = action.payload;
        },
        setSinglePage: (state, action): void => {
            state.singlePage = action.payload;
        },
        setUser: (state, { payload: { userId, prvKey, pubKey } }): void => {
            state.user = {
                userId,
                prvKey,
                pubKey,
            };
        },
        dischargeUser: (state): void => {
            state.user = {
                userId: '',
                prvKey: '',
                pubKey: '',
            };
        },
        setTileData: (state, action): void => {
            state.tileData = action.payload;
        },
        setLoadTileData: (state, action): void => {
            state.isLoadTileData = action.payload;
        },
        setSinglePageTagId: (state, action): void => {
            state.singlePageTagId = action.payload;
        },
        setLogin: (state, action): void => {
            state.isLogin = action.payload;
        },
        setLoginError: (state, action): void => {
            state.isLoginError = action.payload;
        },
        setUserName: (state, action): void => {
            state.userName = action.payload;
        },
    },
});

export const {
    changeServerName,
    setSinglePage,
    setUser,
    setTileData,
    setLoadTileData,
    setLogin,
    setLoginError,
    dischargeUser,
    setSinglePageTagId,
    setUserName,
} = gallerySlice.actions;

type ResolveLoginProps = {
    userId: string;
    prvKey: string;
    pubKey: string;
    status: string;
};

type Props = LoginProps & {
    isLogin: boolean;
    userParams: any;
};

// eslint-disable-next-line
export const Logout = () => async (dispatch: Dispatch) => {
    dispatch(setLogin(false));
    dispatch(dischargeUser());
    dispatch(setTileData([]));
    dispatch(setSinglePage(''));
    dispatch(setUserName(''));
};

// eslint-disable-next-line
export const LoginAsync = ({ serverName, login, password, isLogin, userParams }: Props) => async (dispatch: Dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (serverName) {
                dispatch(setLoginError(false));
                dispatch(setLoadTileData(true));

                /**
                 * Getting a user
                 */
                const data = <ResolveLoginProps>await Login({ serverName, login, password });

                if (data.status === 'error') {
                    reject({
                        status: 'error',
                        message: 'Invalid login',
                    });
                }

                const { userId, prvKey, pubKey } = <ResolveLoginProps>data;
                dispatch(setUser({ userId, prvKey, pubKey }));
                dispatch(setLogin(true));

                /**
                 * Retrieving user content
                 */
                const dataMeta = <{ status?: string; TILE: any }>(
                    await getUserListAssets({ userId, serverName, prvKey, pubKey })
                );

                if (dataMeta.status === 'error') {
                    reject({
                        ...dataMeta,
                    });
                }

                dispatch(setTileData(dataMeta));
                dispatch(setLoadTileData(false));
            }
        } catch (err) {
            dispatch(setLoginError(true));
            resolve(err);
        }
    });
};

// eslint-disable-next-line
export const tileData = (state: any) => state.gallery.tileData;
// eslint-disable-next-line
export const getServerName = (state: any) => state.gallery.serverName;
// eslint-disable-next-line
export const getLogin = (state: any) => state.gallery.isLogin;
// eslint-disable-next-line
export const getLoginError = (state: any) => state.gallery.isLoginError;
// eslint-disable-next-line
export const singlePage = (state: any) => state.gallery.singlePage;
// eslint-disable-next-line
export const singleTileData = (state: any) => {
    if (!state.gallery.tileData.length) {
        return {};
    }
    return state.gallery.tileData.find((el: any) => el.assetId === state.gallery.singlePage);
};
/**
 * Convert the input parameter to a boolean value
 * to select a single picture and switch patterns
 */
// eslint-disable-next-line
export const isSinglePage = (state: any) => Number.isInteger(state.gallery.singlePage);
// eslint-disable-next-line
export const getSinglePageTagId = (state: any) => state.gallery.singlePageTagId;
// eslint-disable-next-line
export const getUserParams = (state: any) => state.gallery.user;
// eslint-disable-next-line
export const getUserName = (state: any) => state.gallery.userName;
// eslint-disable-next-line
export const getLoadTileData = (state: any) => state.gallery.isLoadTileData;

export default gallerySlice.reducer;
