import { TextField } from '@mui/material'
import React, { useState, ChangeEvent } from 'react'
type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void  
}
export const EditableSpan = React.memo(function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    return (
        editMode
            ? <TextField type="text" size='small'  value={title} onChange={onChangeTitleHandler}
                onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})

export default EditableSpan