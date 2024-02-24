import React, {Reducer, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/additemForm/AddItemForm";
import {Header} from "./components/header/Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTasksActionCreate,
    changeStatusActionCreate, changeTaskTitleActionCreate,
    removeTaskActionCreate,
    tasksReducer
} from "./state/tasks-reducer";
import {
    ActionTypeTodolist, addTodolistAction,
    changeFilterTodolistAction, changeTodolistAction,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistType[], ActionTypeTodolist>>(todolistReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    let [tasks,dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
  dispatchTasks(removeTaskActionCreate(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
dispatchTasks(addTasksActionCreate(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
dispatchTasks(changeStatusActionCreate(id,isDone,todolistId))
    }

    function changeFilter( value: FilterValuesType,todolistId: string) {
  dispatchTodolists(changeFilterTodolistAction(todolistId,value))
    }

    function removeTodolist(id: string) {
     let action = removeTodolistAC(id)
        dispatchTodolists(action)
        dispatchTasks(action)

    }

    const addTodolist = (title: string) => {
let action = addTodolistAction(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const updateTask = (todolistId: string, title: string, taskId: string ) => {
        dispatchTasks(changeTaskTitleActionCreate(todolistId,title,taskId))
    }

    const updateTodolist = (todolistId: string, title: string) => {
       dispatchTodolists(changeTodolistAction(todolistId,title))
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding:'10px'}}><AddItemForm callBack={addTodolist}/></Grid>

                <Grid container spacing={4} >

                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return (

                                    <Grid item >
                                        <Paper style={{padding:'10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}

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

export default AppWithReducer;


















