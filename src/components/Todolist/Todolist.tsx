import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from "../../App"
import AddItemForm from '../AddItemForm/AddItemForm'
import EditableSpan from '../EditableSpan/EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map((t, idx) => {
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={idx} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            checked={t.isDone}
                            color={t.isDone ? 'secondary' : 'default'}
                            onChange={onChangeStatusHandler} />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                        <IconButton aria-label="delete" size="small"
                            onClick={() => { props.removeTask(t.id, props.id) }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </li>
                })}
            </ul>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
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
}
