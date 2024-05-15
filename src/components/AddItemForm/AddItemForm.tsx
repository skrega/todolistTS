import { Button, Icon, IconButton, TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState, memo } from 'react'
import AddIcon from '@mui/icons-material/Add';
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( function AddItemForm(props: AddItemFormPropsType) {
    
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError('')
        }
        if (e.code === 'Enter') {
           addItem()
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <TextField fullWidth
                    type='text' value={title}
                    id="standard-basic" variant="outlined"
                    label={'Введите значение'}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    error={!!error}
                    helperText={error}
                />
                <IconButton onClick={addItem} color='primary'><AddIcon /></IconButton>

            </div>
        </div>
    )
})
export default AddItemForm