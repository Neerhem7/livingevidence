import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import exp from 'constants';

interface ThemeState {
    mode: 'dark' | 'light',
    primaryColor: string,
    secondaryColor: string,
    backgroundColor: string,
    textColor: string
}

const initialState: ThemeState = {
    mode : 'light',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    backgroundColor: '#f8f9fa',
    textColor: '#212529',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Partial<ThemeState>>) => {
            return { ...state, ...action.payload };
        },
        toggleTheme: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
                state.backgroundColor = '#212529';
                state.textColor = '#f8f9fa';
            } else {
                state.mode = 'light';
                state.backgroundColor = '#f8f9fa';
                state.textColor = '#212529';
            }
        },
    }
})

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;