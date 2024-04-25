import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from "../../App"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [error, setError] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle('')
        setError('')

    }


    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <div>
                    <input className={error ? 'error' : ''} type='text' value={newTaskTitle}
                        onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t, idx) => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return <li key={idx} className={t.isDone ? 'is-done' : ''}><input type='checkbox' checked={t.isDone}
                        onChange={onChangeHandler} />
                        <span>{t.title}</span>
                        <button onClick={() => { props.removeTask(t.id) }}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

