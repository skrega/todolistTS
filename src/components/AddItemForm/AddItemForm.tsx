import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('')
        setError('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    return (
        <div>
            <div>
                <input className={error ? 'error' : ''} type='text' value={newTaskTitle}
                    onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}
export default AddItemForm