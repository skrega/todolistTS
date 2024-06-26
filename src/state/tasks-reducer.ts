import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
  
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
| AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
    count: []
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter( t => t.id !== action.taskId )
            stateCopy[action.todolistId] = filteredTasks

            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return {...stateCopy}
        }
        case "CHANGE-TASK-STATUS": {
            const todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)

            return {...state}
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId]
            // stateCopy[action.todolistId] = tasks.map( t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            // return {...stateCopy}
        }
        case "CHANGE-TASK-TITLE": {
            const todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
                
            return {...state}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
};

// Actions Creator
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

