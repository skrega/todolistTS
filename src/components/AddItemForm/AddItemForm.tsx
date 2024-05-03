import { Button, Icon, IconButton, TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
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
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <TextField
                    type='text' value={newTaskTitle}
                    id="standard-basic" variant="outlined"
                    label={'Введите значение'}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    error={!!error}
                    helperText={error}
                />
                <IconButton onClick={addTask} color='primary'><AddIcon /></IconButton>

            </div>
        </div>
    )
}
export default AddItemForm