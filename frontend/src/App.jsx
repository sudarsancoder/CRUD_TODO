import React, { useEffect, useState } from 'react'
import List from "./components/List"
import axios from 'axios'
import { baseURL } from './utils/constant';

const App = () => {

  const[input,setInput] = useState("");
  const[tasks,setTasks] = useState([]);
  const[updateUI,setUpdateUI] = useState(false);
  const[updateId,setUpdateId] = useState(null);

useEffect(()=>{
  axios.get(`${baseURL}/get`).then((res)=>{
    console.log(res.data);
    setTasks(res.data);
  });
},[updateUI]);

  const addTask =()=>{
    axios.post(`${baseURL}/save`,{ task : input})
    .then((res)=>{
       console.log(res.data);
       setInput("");
       setUpdateUI((prev)=> !prev);
    });
  }

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask =()=>{
    axios.put(`${baseURL}/update/${updateId}`,{task:input})
    .then((res)=>{console.log(res.data);
    setUpdateUI((prev)=>!prev)
    setUpdateId(null)
    setInput("");
    })
  }
  return (
    <main>
      <h1 className='title'>
        CRUD OPERATIONS
      </h1>
<div>
  <input type="text" 
  value={input} onChange={(e)=> setInput(e.target.value)} />

<button type='submit' onClick={updateId ? updateTask : addTask}>
{updateId ? "Update Task" : "Add Task"}   
</button> 
</div>
        <ul>
          {tasks.map((task)=>(
            <List 
            task={task.task} 
            key={task._id} 
            id={task._id} 
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}/>
          ))}
        </ul>
  </main>
  )
}

export default App