
import { configureStore, createSlice } from "@reduxjs/toolkit";
import {createStore} from 'redux';

const intialState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
  name: "counter",
  initialState:intialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter = state.counter - 3;
    },
    decrementby(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
const initialStateauth = {
  isAuthenticated : false
}
const authSlice = createSlice({
  name : 'authentication',
  initialState : initialStateauth,
  reducers : {
    login(state){
      state.isAuthenticated = true;
    },
    logout(state){
      state.isAuthenticated = false;
    },
  },

})



const store = configureStore({
    reducer : {counter : counterSlice.reducer,auth : authSlice.reducer},
});
// const store = createStore(counterSlice.reducer)
export const counterActions =  counterSlice.actions;
export const authActions = authSlice.actions;

export default store;



// const counterReducer = (state=intialState,action) => {
//     if(action.type === 'increment'){
//         return {
//             counter : state.counter + 5,
//             showCounter : state.showCounter
//         };

//     }
//     if(action.type === 'decrement'){
//         return {
//             counter : state.counter - 1,
//             showCounter : state.showCounter
//         };
//     }
//     if(action.type === 'decrementby'){
//         return {
//             counter : state.counter - 5,
//             showCounter : state.showCounter
//         };
//     }
//     if(action.type === 'increase'){
//         return {
//             counter : state.counter + action.amount,
//             showCounter : state.showCounter,
//         };
//     }
//     if(action.type === 'toggle'){
//         return {
//             showCounter : !state.showCounter,
//             counter : state.counter
//         };
//     }
//     return state;

// }