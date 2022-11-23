import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from '@mui/material';
import {AddTask} from '@mui/icons-material';

type AddIemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddIemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeSetLocalTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onEnterDownAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }
    const errorMessage = error ? <div className={'error-message'}>Title is required</div> : null

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField variant={'outlined'} size={'small'} label={'Type value'}
                       error={!!error}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                className={error ? 'error' : ''}
            />
            <IconButton  onClick={addItem} size={'large'}>
                <AddTask color={'success'}/>
            </IconButton>
                {/*<Button onClick={addItem} variant={'contained'} color={'warning'} size={'small'}>+</Button>*/}
            {/*{error && <div className={'error-message'}>Title is required</div>}*/}
            {errorMessage}
        </div>
    )
}