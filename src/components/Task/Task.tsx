import React, { ChangeEvent, memo, useCallback } from 'react'
import { Checkbox, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskType } from "../Todolist/Todolist"
import EditableSpan from "../EditableSpan/EditableSpan"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../state/tasks-reducer";
import { useDispatch } from "react-redux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(function Task(props: TaskPropsType) {
    const dispatch = useDispatch()
    
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked))
    },[dispatch])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newValue))
    },[dispatch])

    return (
        <li className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                color={props.task.isDone ? 'secondary' : 'default'}
                onChange={onChangeStatusHandler} />
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
            <IconButton aria-label="delete" size="small"
                onClick={() => { dispatch(removeTaskAC(props.task.id, props.todolistId)) }}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </li>
    )
})
