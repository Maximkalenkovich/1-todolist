import React from 'react';
import './App.css';
import {TaskType, TodolistWithRedux} from './TodolistWithRedux';
import {AddItemForm} from "./AddItemForm";
import {Header} from "./Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTasksActionCreate,
    changeStatusActionCreate, changeTaskTitleActionCreate,
    removeTaskActionCreate,
} from "./state/tasks-reducer";
import {
    addTodolistAction,
    changeFilterTodolistAction, changeTodolistAction,
    removeTodolistAC,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
   let dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
       dispatch(removeTaskActionCreate(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTasksActionCreate(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusActionCreate(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
       dispatch(changeFilterTodolistAction(todolistId, value))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        let action = addTodolistAction(title)
        dispatch(action)

    }

    const updateTask = (todolistId: string, title: string, taskId: string) => {
        dispatch(changeTaskTitleActionCreate(todolistId, title, taskId))
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistAction(todolistId, title))
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}><AddItemForm callBack={addTodolist}/></Grid>

                <Grid container spacing={4}>

                    {
                        todolists.map(tl => {

                            return (

                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodolistWithRedux
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                        />
                                    </Paper>
                                </Grid>


                            )
                        })}
                </Grid>
            </Container>


        </div>
    );
}

export default AppWithRedux;


















