import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import projectReducer from './projectSlice';
import themeReducer from './themeSlice';
import prismaPaperReducer from './prismaPaperSlice';
import prismaDiagramReducer from './prismaDiagramSlice';
import iTableReducer from './itableSlice'

export const store  = configureStore({
    reducer: {
        project: projectReducer,
        theme:  themeReducer,
        prismaPaper: prismaPaperReducer,
        prismaDiagram : prismaDiagramReducer,
        itable : iTableReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
