import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist/Todolist';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key:string]: Array<TaskType>
}
function App() {

  function removeTask(id: string, todolistId: string) {
    const tasks = tasksObj[todolistId]
    const filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = filteredTasks

    setTasks({ ...tasksObj })
  }


  function addTask(title: string, todolistId: string) {
    const task = { id: v1(), title: title, isDone: false }
    const tasks = tasksObj[todolistId]
    const newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks

    setTasks({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
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
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [{ id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Book', isDone: false },
    ]
  })

  const removeTodolist = (todolistId: string) => {
    const filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolists)
    delete tasksObj[todolistId]

    setTasks({ ...tasksObj })
  }
  const changeTodolistTitle = (id: string, newTitle: string) => {
   const todolist = todolists.find(tl => tl.id === id)
   if(todolist){
    todolist.title = newTitle
    setTodolists([...todolists])
   }
  }

  function addTodolits(title: string) {
    const todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasksObj, 
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolits} />
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
            changeTodolistTitle={changeTodolistTitle}
            changeTaskTitle={changeTaskTitle}
          />
        })
      }

    </div>
  );
}

export default App;
