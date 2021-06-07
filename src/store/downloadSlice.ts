import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import DownloadContent, { DownloadProps } from '../services/api/DownloadContent';

export const downloadSlice = createSlice({
    name: 'download',
    initialState: {
        downloadFile: '',
    },
    reducers: {
        setDownloadFile: (state, action): void => {
            state.downloadFile = action.payload;
        },
    },
});
export const { setDownloadFile } = downloadSlice.actions;

// eslint-disable-next-line
export const DownloadContentAsync = ({ prvKey, pubKey, assetId, dabId, serverName, buyerId }: DownloadProps) => async (
    dispatch: Dispatch,
) => {
    try {
        const data: any = await DownloadContent({ prvKey, pubKey, assetId, dabId, serverName, buyerId });

        dispatch(setDownloadFile(data));
    } catch (err) {
        console.log(err);
    }
};

// eslint-disable-next-line
export const getDownloadFile = (state: any) => state.download.downloadFile;

export default downloadSlice.reducer;
