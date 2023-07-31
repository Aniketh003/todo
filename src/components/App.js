import { React, useEffect, useState } from 'react'
import './App.css';
import del from './trash.svg';

const getData = () =>{
  const storedTodos = JSON.parse(localStorage.getItem("todos" || []))
  return storedTodos;
}

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState(getData());

  const addCompleted = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  };

  const handleAddTodo = (inputText) => {
    if(inputText){
      setTodos((prevtodods) =>
        [...prevtodods,{id : Date.now(),completed : false,text:inputText}]
      )
      setInput('');
    }
  }

  const handleDeleteTodo = (id) =>{
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1>todos</h1>
      <div className="todo-container">
        <div className="input-feild">
          <input type="text" value={input} placeholder='Enter your todo' className='input' onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          <button className='addbtn' onClick={() => handleAddTodo(input)}>Add</button>
        </div>
        <form className="todo-items">
        {
          todos.map((todo) => (
          <li className={todo.completed ? 'item completed' : 'item'} key={todo.id}  onClick={() => addCompleted(todo.id)}>{todo.text}<img src={del} alt="delbtn" className='delbtn' onClick={() => handleDeleteTodo(todo.id)}/></li>
          ))
        }
        </form>
      </div>
    </>
  );
}
export default App;
