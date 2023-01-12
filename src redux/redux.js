const redux = require('redux');

function counterReducer(state={counter : 0},action) {
    if(action.type === 'decrement'){
        return {counter : state.counter - 1}
    }else{
        return {counter : state.counter + 1}
    }
    // return {
    //     counter : state.counter + 1
    // }

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