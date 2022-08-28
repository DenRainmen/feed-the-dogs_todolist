import React, { ChangeEvent, useState } from "react";
import { TaskType } from "./App";
import { Button } from "./components/Button";

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (elId: string) => void;
  addTask: (inputText: string) => void;
  error: null | string;
  setError: (error: null | string) => void
  changeFilter: (btnName: string)=>void
  changeTaskStatus:(id:string, isDone: boolean)=>void
  filter: string
  setFilter:(filter: string)=>void
};

export function Todolist(props: TodolistPropsType) {

  let [inputText, setInputText] = useState("")



  let tasksList = props.tasks.length ? (
    props.tasks.map((el) => {
      const removeTaskHadler = () => {
        props.removeTask(el.id);
      };

      const onChangeCheckBoxHandler =(evn: ChangeEvent<HTMLInputElement>)=>{
      let isDone = evn.currentTarget.checked
      props.changeTaskStatus(el.id,isDone)
      }

      return (
        <div
         className={el.isDone === true ? 'complete' : ''} 
         key={el.id}
         >
          
          <Button buttonNick={"X"} callBack={removeTaskHadler} />

          <span>{el.title}</span>
          <input
           type="checkbox"
           checked={el.isDone}
           onChange={onChangeCheckBoxHandler} />
        </div>
      );
    })
  ) : (
    <div>Добавь псов в список дел</div>
  );

 const onChangeInputHandler=(event: ChangeEvent<HTMLInputElement>)=>{
  setInputText(event.currentTarget.value)
 }

  const onKeyPressInputHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    props.setError(null);
    if (event.key === "Enter") {
      props.addTask(inputText);
      setInputText("");
    }
  };

 const changeFilterHandler =(btnName: string)=>{
props.changeFilter(btnName)
 }

 //J S X
  return (
    <div className="App">
      <h3 contentEditable='true'>{props.title}</h3>

      <div>
        <input
        title='Введите кличку пса и нажмите Enter '
        placeholder="кличка вашего пса"
          className={props.error ? "error" : ""}
          value={inputText}
          onChange={onChangeInputHandler}
          onKeyPress={onKeyPressInputHandler}
        />
        <button
          onClick={() => {
            props.addTask(inputText);
            setInputText("");
          }}
        >
          +
        </button>
        {props.error ? (
          <div className="error-message"> {props.error} </div>
        ) : (
          ""
        )}
      </div>

      {tasksList}

      <button
        onClick={()=>changeFilterHandler('all')}
        className={props.filter === 'all' ? "btnFilter" : ''}
      >Всё</button>
      <button
      onClick={()=>changeFilterHandler('active')}
      className={props.filter === 'active' ? "btnFilter" : ''}
      >Не сделано</button>
      <button
      onClick={()=>changeFilterHandler('completed')}
      className={props.filter === 'completed' ? "btnFilter" : ''}
      >Сделано</button>
    </div>
  );
}
