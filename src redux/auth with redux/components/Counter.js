import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
import { counterActions } from '../store/redux';

const Counter = () => {
  const dispatch = useDispatch();
  // const [hideCounter,setCounter] = useState(false)
  const show = useSelector(state => state.counter.showCounter)
  const counter = useSelector(state => state.counter.counter)
  const toggleCounterHandler = () => {
    // setCounter(true)
    dispatch(counterActions.toggle())

  };
  const incrementBy = () => {
    dispatch(counterActions.increment())  

  }
  const decrementby = () => {
    dispatch(counterActions.decrement())

  }
  const increase = () => {
    dispatch(counterActions.increase(10))

  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <div>
      <button onClick={incrementBy}>Incrementby5</button>
      </div>
      <div>
      <button onClick={decrementby}>Decrementby5</button>
      </div>
      <div>
      <button onClick={increase}>Increase by 10</button>
      </div>
    </main>
  );
};

export default Counter;
