import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, TextField} from '@mui/material';
import {Delete} from '@mui/icons-material';


type TypeProps = {
    todolistId: string
    title: string
    tasks1: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TypeProps) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle, props.todolistId)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todolistId)
    }
    const onEnterDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onChangeSetLocalTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const removeTodoList = () => props.removeTodoList(props.todolistId)
    const tasksList = props.tasks1.map((task) => {
        const removeTask = () => props.removeTask(task.id, props.todolistId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId);
        const changeTaskTitle = (title: string) =>
            props.changeTaskTitle(task.id, title, props.todolistId)

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : 'is-notcompleted'}>
                <input type={"checkbox"} defaultChecked={task.isDone} onChange={changeTaskStatus}/>
                {/*<span>{task.title}</span>*/}
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })


    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todolistId)
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <TextField variant={'filled'} size={'small'} label={'Type value'}
                           value={title}
                           onChange={onChangeSetLocalTitle}
                           onKeyDown={onEnterDownAddTask}
                    // className={error ? 'error' : ''}
                           error={!!error}
                           helperText={error}
                />
                <Button onClick={addTask} variant={'contained'} color={'secondary'} size={'small'}>+</Button>
                {/*{error && <div className={'error-message'}>Title is required </div>}*/}
            </div>
            <ul>
                {tasksList}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={handlerCreator("all")}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={handlerCreator("active")}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={handlerCreator("completed")}>Completed
                </Button>

            </div>
        </div>
    )
}
