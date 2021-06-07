import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import Royalties, { PropsRoyalties } from '../services/api/Royalties';

export const royaltiesSlice = createSlice({
    name: 'royalties',
    initialState: {
        royaltiesSingleData: {},
    },
    reducers: {
        setRoyaltiesSingleData: (state, action): void => {
            state.royaltiesSingleData = action.payload;
        },
    },
});

export const { setRoyaltiesSingleData } = royaltiesSlice.actions;

export interface PropsRoyaltiesData {
    description: string;
}

export type TypeRoyalties = string[];

// eslint-disable-next-line
export const RoyaltiesAsync = ({ userId, serverName, tagId, licenseType }: PropsRoyalties) => async (
    dispatch: Dispatch,
) => {
    try {
        // console.log(tagId);

        // const tagIdPercent = await RoyaltiesTagIdPercent({ serverName, tagId });
        const result: any = await Royalties({ userId, serverName, tagId, licenseType });
        dispatch(setRoyaltiesSingleData(result));
    } catch (err) {
        console.log(err);
    }
};

// eslint-disable-next-line
export const getRoyaltiesSingleData = (state: any) => state.royalties.royaltiesSingleData;

export default royaltiesSlice.reducer;
