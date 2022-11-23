import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TaskType} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

// let tasks1= [
//     {id:1, title: 'CSS', isDone: true},
//     {id:2, title: 'HTML', isDone: false},
//     {id:3, title: 'JS', isDone: false},
//     {id:4, title: 'React', isDone: false},
//     {id:5, title: 'Redux', isDone: false},
//     {id:6, title: 'C+', isDone: false}
// ]
// let tasks2: Array<TaskType>= [
//     {id:1, title: 'Triller', isDone: false},
//     {id:2, title: 'Comedy', isDone: true},
//     {id:3, title: 'Romantic', isDone: true}
// ]

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListTitle = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListTitle>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks1, setTasks1] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Toilet paper', isDone: false},
            {id: v1(), title: 'Buckwheat', isDone: true},
            {id: v1(), title: 'Meet', isDone: false},
        ]
    })
    // const [tasks1, setTasks1] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: false},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'React', isDone: true},
    //     {id: v1(), title: 'Redux', isDone: false},
    // ])
    // const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (taskId: string, todoListId: string) => {
        const copyTasks = {...tasks1}
        copyTasks[todoListId] = copyTasks[todoListId].filter((tasks1) => tasks1.id !== taskId)
        setTasks1(copyTasks)
        //тоже но короче
        // setTasks1({...tasks1,
        //     [todoListId]: tasks1 [todoListId].filter((tasks1) => tasks1.id !== taskId)
        // })
        //cтарые записи
        // setTasks1(tasks1.filter((tasks1) => tasks1.id !== taskId)) //true ||  false
    }
    //максимально разжеванный синтаксис
    // const addTask = (title: string) => {
    //     const newTask: TaskType = {
    //         id: v1(),
    //         title: title,
    //         isDone: false
    //     }
    //     const copyTask = [...tasks1]
    //     copyTask.push(newTask)
    //     setTasks1(copyTask)
    // }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks1({...tasks1, [todoListId]: [newTask, ...tasks1[todoListId]]})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks1[todoListId]
    }

    const addTodolist = (title: string) => {
        const newTodoListId: string = v1()
        const newTodoList: TodoListTitle = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks1({...tasks1, [newTodoListId]: []})
    }

    function changeTaskStatus(taskId: string, newTaskStatus: boolean, todoListId: string) {
        // let task = tasks1.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        setTasks1({
            ...tasks1,
            [todoListId]: tasks1[todoListId].map(t => t.id === taskId
                ? {...t, isDone: newTaskStatus}
                : t)
        });
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks1({
            ...tasks1,
            [todoListId]: tasks1[todoListId].map(t => t.id === taskId
                ? {...t, title: title}
                : t)
        });
    }

    const getFilteredTask = (tasks1: Array<TaskType>, filter: FilterValuesType) => {
        let tasks1ForTodolist = tasks1;
        if (filter === 'active') {
            tasks1ForTodolist = tasks1.filter(tasks1 => tasks1.isDone === false)
        }
        if (filter === 'completed') {
            tasks1ForTodolist = tasks1.filter(tasks1 => tasks1.isDone === true)
        }
        return tasks1ForTodolist

    }

    const todoListComponents = todoLists.map(tl => {
        const filteredTasks = getFilteredTask(tasks1[tl.id], tl.filter)
        return (
            <div className="App">

                {/*<Todolist title='What to learn'/>*/}
                <Grid item>
                    <Paper style={{padding: '10px',margin: '20px'}}>
                        <Todolist
                            key={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            todolistId={tl.id}
                            tasks1={filteredTasks}
                            addTask={addTask}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                            changeTodoListTitle={changeTodoListTitle}
                            changeTodoListFilter={changeTodoListFilter}
                        />
                    </Paper>
                </Grid>
                {/*<Todolist title='Movies' tasks={tasks2}/>*/}
                {/*<input/>*/}
                {/*<input type={"checkbox"}/>*/}
            </div>
        );
    })
    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>
                    {todoListComponents}
                </Grid>
            </Container>

        </div>

    )
}

export default App;
