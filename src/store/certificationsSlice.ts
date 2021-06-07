import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import Certifications, { PropsCertifications } from '../services/api/Certifications';

export const certificationsSlice = createSlice({
    name: 'certifications',
    initialState: {
        certificationsData: [],
    },
    reducers: {
        setCertificationsData: (state, action): void => {
            state.certificationsData = action.payload;
        },
    },
});

export const { setCertificationsData } = certificationsSlice.actions;

export interface PropsCertificationsData {
    description: string;
}

export type TypeCertifications = string[];

// eslint-disable-next-line
export const CertificationsAsync = ({ userId, serverName, dabId }: PropsCertifications) => async (
    dispatch: Dispatch,
) => {
    try {
        const result: any = await Certifications({ userId, serverName, dabId });

        const certificationsData: TypeCertifications = result.length
            ? result.map((el: PropsCertificationsData) => el.description)
            : [];

        dispatch(setCertificationsData(certificationsData));
    } catch (err) {
        console.log(err);
    }
};

// eslint-disable-next-line
export const getCertificationsData = (state: any) => state.certifications.certificationsData;

export default certificationsSlice.reducer;
