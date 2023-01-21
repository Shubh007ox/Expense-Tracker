import { createSlice } from "@reduxjs/toolkit";

const initialExpense = {expenses : [],permiumButton : false};


const expenseSlice = createSlice({
    name : 'expenses',
    initialState : initialExpense,
    reducers : {
        updateExpenses(state,action){
            state.expenses = action.payload
        },
        postNewExpense(state,action){
            console.log('expense Added',action.payload)
            state.expenses=[...state.expenses,action.payload]
        },
        editingExpense(state,action){
            let filterArray = state.expenses.filter((arr) => arr.Id !== action.payload);
            state.expenses = filterArray;
        },
        setPremimumButton(state){
            state.permiumButton = true;
        },
        unsetPerminumButton(state) {
            state.permiumButton = false;
        },
    }
})

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;