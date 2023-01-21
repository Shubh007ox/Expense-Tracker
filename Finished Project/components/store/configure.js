import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from './expense';
import themeReducer from "./theme";

const store = configureStore({
    reducer : {expense : expenseReducer,theme : themeReducer},
});


export default store;