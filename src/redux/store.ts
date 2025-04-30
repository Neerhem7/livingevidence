import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import projectReducer from './projectSlice';
import themeReducer from './themeSlice';
import prismaPaperReducer from './prismaPaperSlice';
import prismaDiagramReducer from './prismaDiagramSlice';

export const store  = configureStore({
    reducer: {
        project: projectReducer,
        theme:  themeReducer,
        prismaPaper: prismaPaperReducer,
        prismaDiagram : prismaDiagramReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
