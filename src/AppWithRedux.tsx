import React, { useCallback, useReducer, useState, } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist/Todolist';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
// import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// const Fake = React.memo( function Fake() {
//     console.log("fake");
    
//     const arr = useSelector<AppRootState, Array<TaskType>>(state => state.tasks.count)
//     return <h1>{arr.length}</h1>
// })

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists) // достаем из state todo list и tasks

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    },[dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        // dispatchToTasksReducer(action)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback( (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])

    const addTodolits = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Container fixed >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                TODO LIST
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <Container fixed >
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodolits} />
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map((tl) => {
                            // const allTodolistTasks = tasks[tl.id]
                            // const tasksForTodoList = allTodolistTasks
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{ padding: '10px 15px 15px' }}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
