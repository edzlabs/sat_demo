import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallerySlice';
import certificationsReducer from './certificationsSlice';
import downloadReducer from './downloadSlice';
import royaltiesReducer from './royaltiesSlice';

export default configureStore({
    reducer: {
        gallery: galleryReducer,
        certifications: certificationsReducer,
        download: downloadReducer,
        royalties: royaltiesReducer,
    },
});
