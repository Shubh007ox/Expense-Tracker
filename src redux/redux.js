const redux = require('redux');

function counterReducer(state={counter : 0},action) {
    if(action.type === 'decrement'){
        return {counter : state.counter - 1}
    }else if(action.type === 'increment2'){
        return {counter : state.counter + 2}
    }else if(action.type === 'decrement2'){
        return {counter : state.counter - 2}
    }
    else{
        return {counter : state.counter + 1}
    }
    // return {
    //     counter : state.counter + 1
    // }
    return state;
}

const store = redux.createStore(counterReducer);
// console.log(store.getState());

const counterSubs = () => {
    const latestState = store.getState();
    console.log(latestState)
}

store.subscribe(counterSubs);

store.dispatch({type : 'increment'});
store.dispatch({type : 'increment'});
store.dispatch({type : 'increment'});
store.dispatch({type : 'increment'});
store.dispatch({type : 'increment'});
store.dispatch({type : 'decrement'});
store.dispatch({type : 'increment2'});
store.dispatch({type : 'decrement2'});
store.dispatch({type : 'decrement'});