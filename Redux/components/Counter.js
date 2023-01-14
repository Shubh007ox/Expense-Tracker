import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  const toggleCounterHandler = () => {};
  const incrementBy = () => {
    dispatch({type : 'increment'})

  }
  const decrementby = () => {
    dispatch({type : 'decrementby'})

  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <div>
      <button onClick={incrementBy}>Incrementby5</button>
      </div>
      <div>
      <button onClick={decrementby}>Decrementby5</button>
      </div>
    </main>
  );
};

export default Counter;
