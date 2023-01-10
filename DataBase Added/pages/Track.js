import React, { useState,useRef, useEffect } from "react";
import Card from "../components/Card/Card";
import classes from "./Tracker.module.css";

function Track(props) {
  const Expenseinput = useRef();
  const ExpenseDespInput = useRef();
  const ExpenseCategoryInput = useRef();
  const [Data,setData] = useState([])
  // const [input,setinput] = useState({
  //   ExpennseP : "",
  //   ExpenseDesp : "",
  //   ExpenseCat : ""

  // })
  // const [des,setdes] = useState('')
  // const [category,setCategory] = useState('')
  let emails = localStorage.getItem('enteredEmail')
  let newemail = emails.replace('@','');
  let newId = newemail.replace('.','');

  const savaData = (event) => {
    // const [list,setList] = useState([])
    event.preventDefault();

    const enteredExpense = Expenseinput.current.value;
    const entereDescrip = ExpenseDespInput.current.value;
    const enteredCategory = ExpenseCategoryInput.current.value;

    fetch(`https://authentication-61603-default-rtdb.firebaseio.com/${newId}.json`,{
      method : "POST",
      body : JSON.stringify({
        Amount : enteredExpense,
        description : entereDescrip,
        Category : enteredCategory,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res)
    })
  };
  useEffect(() => {
    const getInputData = async() => {

      const response = await fetch(`https://authentication-61603-default-rtdb.firebaseio.com/${newId}.json`)
      const responseData = await response.json();

      const ExpenseItems = []
      for(const key in responseData){
        ExpenseItems.push({
          id : key,
          Amount : responseData[key].Amount,
          Description : responseData[key].description,
          Category : responseData[key].Category

        })
      }
      setData(ExpenseItems);
    };
    getInputData();

  },[])

  

  return (
    <React.Fragment>
      <div className={classes.auth}>
        <form>
          <div className={classes.control}>
            <label htmlFor="expense">Expense</label>
            <input type="number" id="amount" required ref={Expenseinput}/>
          </div>
          <div className={classes.control}>
            <label htmlFor="Description">Description</label>
            <textarea
              type="text"
              id="Descrip"
              className={classes.area}
              ref={ExpenseDespInput}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor="category">Choose category</label>
            <select name="cat" id="cat" className={classes.select} required ref={ExpenseCategoryInput}>
              <option value="MOvies">Movies</option>
              <option value="food">Food</option>
              <option value="Electricity">Electricity</option>
              <option value="M-bill">Mobile-bills</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button type="button" className={classes.toggle} onClick={savaData}>
              Add Expense
            </button>
          </div>
        </form>
      </div>
      <Card>
        <h1>Your Expenses</h1>
        {Data.map((item) => (
          <ul>
            <th>Amount -- {item.Amount}</th><br></br>
            <th>Description --- {item.Description}</th><br></br>
            <th>Category --- {item.Category}</th><br></br>
            <th><button>Delete</button></th>
            <th><button>EditInfo</button></th>
          </ul>
        ))}
      </Card>
    </React.Fragment>
  );
}

export default Track;
// onChange={onChangeHandler} value={input.ExpennseP}

// showObject(Object);
// };

// function showObject(user){
//  const parentnode = document.getElementById('list');
//  const childnode = `<li id=${user.Descrip}> ${user.Amount}--${user.Category}---${user.Descrip},
//  <button onclick=deleteInfo('${user.Descrip}')>Delete Info
//  <button onclick=EditInfo('${user.Descrip}','${user.Amount}','${user.Category}','${user.Descrip}')>Edit Info`
//  parentnode.innerHTML = parentnode.innerHTML + childnode
// }
// function deleteInfo(Descrip) {
//  console.log(Descrip);
//  // localStorage.removeItem(Descrip);
//  removeFromS(Descrip);
// }
// function removeFromS(Descrip) {
//  const parentnode = document.getElementById('list');
//  const CtoD = document.getElementById('Descrip');
//  parentnode.removeChild(CtoD);
// }
// function EditInfo(Amount, Descrip, Category) {
//  console.log(Descrip);
//  document.getElementById("amount").value = Amount;
//  document.getElementById("Descrip").value = Descrip;
//  document.getElementById("cat").value = Category;
//  deleteInfo(Descrip);
// }
