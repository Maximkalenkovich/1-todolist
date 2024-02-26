import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodolistWithRedux} from './components/todolist/TodolistWithRedux';
import {AddItemForm} from "./components/additemForm/AddItemForm";
import {Header} from "./components/header/Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAction,
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


export const AppWithRedux = () => {

    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let dispatch = useDispatch()
    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAction(title)
        dispatch(action)

    }, [dispatch])

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}><AddItemForm callBack={addTodolist}/></Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map(tl => {
                            return (
                                <Grid item key={tl.id}>
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


// import {
//     addTasksActionCreate,
//     changeStatusActionCreate,
//     changeTaskTitleActionCreate,
//     removeTaskActionCreate
// } from "./state/tasks-reducer";
//


// let task = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)


// const updateTask = useCallback((todolistId: string, title: string, taskId: string) => {
//     dispatch(changeTaskTitleActionCreate(todolistId, title, taskId))
// },[dispatch])
//
// const updateTodolist = useCallback((todolistId: string, title: string) => {
//     dispatch(changeTodolistAction(todolistId, title))
// },[dispatch])


// const removeTask = useCallback((id: string, todolistId: string) =>{
//     dispatch(removeTaskActionCreate(id, todolistId))
// },[dispatch])
//
//  const addTask=useCallback((title: string, todolistId: string) =>{
//      dispatch(addTasksActionCreate(title, todolistId))
//  },[dispatch])
//
//  const changeStatus= useCallback((id: string, isDone: boolean, todolistId: string)=> {
//      dispatch(changeStatusActionCreate(id, isDone, todolistId))
//  },[dispatch])
//
//  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) =>{
//     dispatch(changeFilterTodolistAction(todolistId, value))
//  },[dispatch])
//
//  const removeTodolist=useCallback((id: string) =>{
//      let action = removeTodolistAC(id)
//      dispatch(action)
//  },[dispatch])

