import React, { useRef, useState, useEffect } from "react";
import Expenses from "./Expenses";
import classes from "./ExpensesForm.module.css";
import useHttp from "../components/hook/fetchCustom";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../components/store/expense";
import { themeAction } from "../components/store/theme";
// import classes from './dark.module.css';
const ExpensesForm = () => {
  const expenseArr = useSelector((state) => state.expense.expenses);
  const premiumButton = useSelector((state) => state.expense.permiumButton);
  const premium = useSelector((state) => state.theme.PremiumsetOn);
  const [isEditId, setIsEditId] = useState(null);
  const enteredAmountRef = useRef();
  const enteredDesRef = useRef();
  const enteredCatRef = useRef();
  const [color,setColor] = useState(classes.auth);
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();

  let emails = localStorage.getItem("enteredEmail");
  let newemail = emails.replace("@", "");
  let newId = newemail.replace(".", "");

  useEffect(() => {
    const resData = (res) => {
      let arr = [];
      for (const prop in res.data) {
        arr.push({
          Id: prop,
          amount: res.data[prop].amount,
          category: res.data[prop].category,
          description: res.data[prop].description,
        });
      }
      console.log(arr);
      dispatch(expenseAction.updateExpenses(arr));
    };
    sendRequest(
      {
        request: "get",
        url: `https://authentication-61603-default-rtdb.firebaseio.com/${newId}.json`,
        header: { "Content-Type": "application/json " },
      },
      resData
    );
  }, [sendRequest, dispatch]);

  const editButtonHandler = (data) => {
    dispatch(expenseAction.editingExpense(data.Id));
    enteredAmountRef.current.value = data.amount;
    enteredDesRef.current.value = data.description;
    enteredCatRef.current.value = data.category;
    setIsEditId(data.Id);
  };

  const deleteButtonHandler = (data) => {
    console.log(data);
    const resData = () => {
      dispatch(expenseAction.editingExpense(data));
    };

    sendRequest(
      {
        request: "delete",
        url: `https://authentication-61603-default-rtdb.firebaseio.com/${newId}/${data}.json`,
        header: { "Content-Type": "application/json " },
      },
      resData,
      console.log(resData)
    );
  };

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const enteredAmount = enteredAmountRef.current.value;
    const enteredDes = enteredDesRef.current.value;
    const enteredCat = enteredCatRef.current.value;

    const expenseObj = {
      amount: enteredAmount,
      description: enteredDes,
      category: enteredCat,
    };

    if (
      enteredAmount.trim().length === 0 ||
      enteredDes.trim().length === 0 ||
      enteredCat.trim().length === 0
    ) {
      alert("Fill all inputs before submit");
    } else {
      if (isEditId === null) {
        console.log("post");
        const resData = (res) => {
          const expenseObjWithId = { ...expenseObj, Id: res.data.name };
          dispatch(expenseAction.postNewExpense(expenseObjWithId));
        };

        // fetch(`https://authentication-61603-default-rtdb.firebaseio.com/${newId}.json`, {
        //   method : 'POST',
        //   body : JSON.stringify({
        //     id: expenseObj.id,
        //     amount : expenseObj.amount,
        //     description : expenseObj.description,
        //     category : expenseObj.category
        //   }),
        //   headers : {
        //     'Content-Type' : 'application/json'
        //   },
        //   resData
        // })
        // resData

        sendRequest(
          {
            request: "post",
            url: `https://authentication-61603-default-rtdb.firebaseio.com/${newId}.json`,
            body: expenseObj,
            header: { "Content-Type": "application/json " },
          },
          resData
        );
      } else {
        const resEditData = (data) => {
          console.log(data, "put data");
          dispatch(expenseAction.postNewExpense(data.data));
          setIsEditId(null);
        };

        sendRequest(
          {
            request: "put",
            url: `https://authentication-61603-default-rtdb.firebaseio.com/${newId}/${isEditId}.json`,
            body: expenseObj,
            header: { "Content-Type": "application/json " },
          },
          resEditData
        );
      }
    }

    enteredAmountRef.current.value = "";
    enteredDesRef.current.value = "";
    enteredCatRef.current.value = "";
  };

  useEffect(() => {
    if (expenseArr.length > 0) {
      let totalAmount = expenseArr.reduce((prev, current) => {
        return prev + Number(current.amount);
      }, 0);

      if (totalAmount > 1000) {
        dispatch(expenseAction.setPremimumButton());
      } else {
        dispatch(expenseAction.unsetPerminumButton());
        dispatch(themeAction.themeSetoff());
        dispatch(themeAction.PremiumsetOff());
      }
    }
    premiumHAndler
  }, [expenseArr, dispatch]);

  const premiumHAndler = (event) => {
    event.preventDefault();
    dispatch(themeAction.themeSetOn());
    dispatch(themeAction.PremiumsetOn());

    setColor(classes.dark)

  };

  function makeCSV(data) {
    let arr1 = data.map((obj) => {
      let arr2 = [obj.amount, obj.category, obj.description];
      return arr2.join();
    });
    arr1.unshift(["AMOUNT", "CATEGORY", "DESCRIPTION"]);
    return arr1.join("\n");
  }

  const blob = new Blob([makeCSV(expenseArr)]);

  return (
    <React.Fragment>
      {error && <h1 className={classes.actions}>{`${error}!!! :(`}</h1>}
      <div className={color}>
      <form>
        <h1>Expenses Form</h1>
        <div className={classes.control}>
        <label htmlFor="money">Amount</label>
        <input ref={enteredAmountRef} type="number" id="money"></input>
        </div>
        <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <input ref={enteredDesRef} type="text" id="description"></input>
        </div>
        <div className={classes.control}>
        <label htmlFor="expenses">Category</label>
        <select className={classes.select} ref={enteredCatRef} id="category">
          <option value="MOvies">Movies</option>
          <option value="food">Food</option>
          <option value="Electricity">Electricity</option>
          <option value="M-bill">Mobile-bills</option>
        </select>
        </div>
        <div className={classes.actions}>
        <button className={classes.toggle} onClick={addExpenseHandler}>
          Submit
        </button>
        </div>
        {premiumButton && (
          <button onClick={premiumHAndler} className={classes.button}>
            {premium
              ? "you subscribe to premium"
              : "Expense Amount exceed $1000, click here for premium"}
          </button>
        )}
        {expenseArr.length > 0 && premium && (
          <a
            className={classes.file}
            href={URL.createObjectURL(blob)}
            download="file.csv"
          >
            Download Expense
          </a>
        )}
      </form>
      </div>
      <section className={classes.section}>
        <h2 className={classes.heading}>Your Expenses</h2>
        {expenseArr.length > 0 &&
          expenseArr.map((obj) => {
            return (
              <Expenses
                key={Math.random()}
                items={obj}
                editButtonClicked={editButtonHandler}
                deleteButtonClicked={deleteButtonHandler}
              />
            );
          })}
      </section>
    </React.Fragment>
  );
};
export default ExpensesForm;
