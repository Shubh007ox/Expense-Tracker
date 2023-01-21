import { createSlice } from "@reduxjs/toolkit";

const initialState = {themeShow : false, PremiumsetOn : false};

const themeSlice = createSlice({
    name : 'themeShow',
    initialState : initialState,
    reducers : {
        toggleTheme(state){
            state.themeShow = !state.themeShow;
        },
        themeSetOn(state){
            state.themeShow = true;
        },
        themeSetoff(state){
            state.themeShow = false;
        },
        PremiumsetOn(state){
            state.PremiumsetOn  = true;
        },
        PremiumsetOff(state){
            state.PremiumsetOn = false;
        },   

    }
})
export const themeAction = themeSlice.actions;
export default themeSlice.reducer;