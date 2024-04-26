import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
function App() {

  function removeTask(id: string, todolistId: string) {
    const tasks = tasksObj[todolistId]
    const filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = filteredTasks

    setTasks({...tasksObj})
  }


  function addTask(title: string, todolistId: string) {
    const task = { id: v1(), title: title, isDone: false }
    const tasks = tasksObj[todolistId]
    const newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks

    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'active' },
    { id: todolistId2, title: 'What to buy', filter: 'completed' },
  ])

  const [tasksObj, setTasks] = useState({
    [todolistId1]: [{ id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Book', isDone: false },
    ]
  })

  const removeTodolist = (todolistId:string) => {
    const  filteredTodolists = todolists.filter(tl => tl.id !== todolistId )
    setTodolists(filteredTodolists)
    delete tasksObj[todolistId]

    setTasks({...tasksObj})

  } 

  return (
    <div className="App">
      {
        todolists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id]

          if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
          }
          return <Todolist title={tl.title}
            tasks={tasksForTodoList} removeTask={removeTask}
            key={tl.id}
            id={tl.id}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        })
      }

    </div>
  );
}

export default App;
