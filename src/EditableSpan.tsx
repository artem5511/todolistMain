import React, {ChangeEvent, useState} from "react";
import {TextField} from '@mui/material';

type EditableSpanPropsType= {
    title: string
    // changeTitle: (newTitle: string) => void
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeSetLocalTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onEditMode = () => {
setIsEditMode(true)
    }
    const ofEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    return (
        isEditMode
            ? <TextField variant={'standard'}
            value={title}
            autoFocus
            onBlur={ofEditMode}
            onChange={onChangeSetLocalTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}