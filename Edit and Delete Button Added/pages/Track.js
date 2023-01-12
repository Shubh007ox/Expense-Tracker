import axios from "axios";
import React, { useState,useRef, useEffect } from "react";
import Card from "../components/Card/Card";
import classes from "./Tracker.module.css";

function Track(props) {
  const Expenseinput = useRef();
  const ExpenseDespInput = useRef();
  const ExpenseCategoryInput = useRef();
  const [Data,setData] = useState([])
  const [Edit,setEdit] = useState(null)
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

    let ExpenseItems;

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
  const deleteHandler = (id) => {
    axios.delete(`https://authentication-61603-default-rtdb.firebaseio.com/${newId}/${id}.json`)
    .then((response) => {
      console.log(response)
      console.log("Expenses Deleted SucessFully")
    })
    .catch((err) => {
      console.log(err)

    })



  }

  const EditHandler = (expense,Description,Category,id) => {
    document.getElementById('amount').value = expense,
    document.getElementById('Descrip').value = Description,
    document.getElementById('category').value = Category
    // enteredExpense = Expenseinput.current.value;
    // entereDescrip = ExpenseDespInput.current.value;
    // enteredCategory = ExpenseCategoryInput.current.value;
    let EditInfo = Data.find((item) => {
      return item.id === id
    })
    console.log(EditInfo)
    fetch(`https://authentication-61603-default-rtdb.firebaseio.com/${newId}/${id}.json`,{
      method : "PUT",
      body : JSON.stringify({
        Amount : expense,
        Descrip : Description,
        Category : Category
      }),
      headers : {
        "Content-type" : "application/json"
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    

  }
  useEffect(() => {
    const getInputData = async() => {
      try{
      const response = await fetch(`https://authentication-61603-default-rtdb.firebaseio.com/${newId}.json`)
      const responseData = await response.json();

      let ExpenseItems = []
      for(const key in responseData){
        ExpenseItems.push({
          id : key,
          Amount : responseData[key].Amount,
          Description : responseData[key].description,
          Category : responseData[key].Category

        })
      }
      setData(ExpenseItems);
    }
    catch{

    }
  };
    getInputData();

  },[])

  

  return (
    <React.Fragment>
      <div className={classes.auth}>
        <form>
          <div className={classes.control}>
            <label htmlFor="amount">Expense</label>
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
            <select name="cat" id="category" className={classes.select} required ref={ExpenseCategoryInput}>
              <option value="MOvies">Movies</option>
              <option value="food">Food</option>
              <option value="Electricity">Electricity</option>
              <option value="M-bill">Mobile-bills</option>
            </select>
          </div>
          <div className={classes.actions}>
            {Edit ? <button type="button" className={classes.toggle} onClick={savaData}>
              Add Expense
            </button> : <span><button onClick={()=>EditHandler(Data.id)}>EditInfo</button></span> }
          </div>
        </form>
      </div>
      <Card>
        <h1>Your Expenses</h1>
        {Data.map((item) => (
          <div className={classes.button}>
            <span className={classes.spn}>Amount == {item.Amount}Rs___,</span>
            <span>Description == {item.Description}___,</span>
            <span>Category == {item.Category}___,</span>
            <span><button onClick={()=>deleteHandler(item.id)}>Delete</button></span>
            <span><button onClick={()=>EditHandler(item.Amount,item.Description,item.Category,item.id)}>EditInfo</button></span> 
          </div>
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
