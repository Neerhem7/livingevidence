import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import projectReducer from './projectSlice';
import themeReducer from './themeSlice';
import prismaPaperReducer from './prismaPaperSlice';
import prismaDiagramReducer from './prismaDiagramSlice';
import iTableReducer from './itableSlice'
import authReducer from './authSlice';

export const store  = configureStore({
    reducer: {
        projects: projectReducer,
        theme:  themeReducer,
        prismaPaper: prismaPaperReducer,
        prismaDiagram : prismaDiagramReducer,
        itable : iTableReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
