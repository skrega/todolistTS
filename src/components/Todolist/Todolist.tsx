import React, { ChangeEvent, memo, useCallback } from 'react'
// import { FilterValuesType, TasksStateType } from "../../App"
import { FilterValuesType } from '../../AppWithRedux'
import AddItemForm from '../AddItemForm/AddItemForm'
import EditableSpan from '../EditableSpan/EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppRootState } from '../../state/store'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../state/tasks-reducer'
import { Task } from '../Task/Task'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = React.memo(function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle, props.id)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodoList = tasks

    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            {/* <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))} /> */}
            <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))} />
            <ul>
                {tasksForTodoList.map((t, idx) =>
                    <Task
                        task={t}
                        todolistId={props.id}
                        key={t.id}
                    />
                )}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button color='info' variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
})

