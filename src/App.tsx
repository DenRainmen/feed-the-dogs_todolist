import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import {v1} from 'uuid'

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const App = () => {
  let [tasks, setTasks] = useState([
     { id: v1(), title: "HTML&CSS", isDone: true },
   
  ])



  const [error,setError] = useState<null | string>(null)

  const[filter, setFilter] = useState("all")

 
  const removeTask =(elId: string)=>{
      tasks = tasks.filter(el => el.id !== elId)
      setTasks(tasks)
  }

  const changeTaskStatus =(id:string, isDone: boolean)=>{
    setTasks( tasks.map(el=> el.id === id ? {...el, isDone} : el)  )
  }

 


 const addTask =(inputText: string)=>{
  let newTask = {id: v1(), title: inputText.trim(), isDone: false }
  if (inputText.trim() === "" ){
    setError("Incorrect input !")
    setTasks(tasks)
   
  } else{
    setTasks([...tasks, newTask]);
  } 
}

const changeFilter =(btnName: string)=>{
  setFilter(btnName)
  
}

let filteredTasks = tasks

switch(filter){
  case 'active':
      filteredTasks = tasks.filter(el => el.isDone === false)
      break
  case 'completed':
      filteredTasks = tasks.filter(el => el.isDone === true)
      break

}



  return (
    <div className="App">
      <Todolist 
      title="Покормить псов"
       tasks={filteredTasks} 
       removeTask={removeTask}
       addTask={addTask}
       error={error}
       setError={setError}
       changeFilter={changeFilter}
       changeTaskStatus={changeTaskStatus}
       filter={filter}
       setFilter={setFilter}
       />
    </div>
  );
};
