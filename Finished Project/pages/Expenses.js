import React from "react";
import classes from "./Expenses.module.css";
const Expenses = (prop) => {
  console.log("inside expense");
  return (
    <React.Fragment>
      <div>
        <ul className={classes.ul}>
          <span className={classes.control}>
          <li>Amount : {prop.items.amount}</li>
          <li>Description : {prop.items.description}</li>
          <li>Category : {prop.items.category}</li>
          </span>
          <span className={classes.actions}>
          <button onClick={() => prop.editButtonClicked(prop.items)}>EDIT</button>
        <button onClick={() => prop.deleteButtonClicked(prop.items.Id)}>
          DELETE
        </button>
          </span>
        </ul>
      </div>
      {/* <div className={classes.toggle}>
        <span>
          <h3>Amount :</h3>
          <h2>{prop.items.amount} Rs</h2>
        </span>
        <span>
          <h3>Description :</h3>
          <h2>{prop.items.description}</h2>
        </span>
        <span>
          <h3>Category :</h3>
          <h2>{prop.items.category}</h2>
        </span>
        <span className={classes.actions}>
        <button onClick={() => prop.editButtonClicked(prop.items)}>EDIT</button>
        <button onClick={() => prop.deleteButtonClicked(prop.items.Id)}>
          DELETE
        </button>
        </span>
      </div> */}
    </React.Fragment>
  );
};
export default Expenses;
