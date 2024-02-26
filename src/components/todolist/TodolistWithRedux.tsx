import React, {memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from '../../AppWithRedux';
import {AddItemForm} from "../additemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {CheckBox} from "../chekbox/Cheked";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {changeFilterTodolistAction, changeTodolistAction, removeTodolistAC} from "../../state/todolist-reducer";
import {
    addTasksActionCreate,
    changeStatusActionCreate,
    changeTaskTitleActionCreate,
    removeTaskActionCreate
} from "../../state/tasks-reducer";
import {MyButton} from "../button/Button";
import {Task} from "../task/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodolistWithRedux = memo((props: PropsType)=> {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    let dispatch = useDispatch()

    const removeTodolist = () => dispatch(removeTodolistAC(props.id))

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTasksActionCreate(title, props.id))
    },[props.id,dispatch])

    const updateTodolistHandler=(title: string)=>{
       dispatch(changeTodolistAction(props.id,title))
    }

    const onAllClickHandler = useCallback(() => dispatch(changeFilterTodolistAction(props.id,"all")),[dispatch,props.id]);
    const onActiveClickHandler =useCallback(() =>  dispatch(changeFilterTodolistAction(props.id,"active")),[dispatch,props.id]);
    const onCompletedClickHandler = useCallback(() =>  dispatch(changeFilterTodolistAction(props.id,"completed")),[dispatch,props.id]);


    const filteredTasks = useMemo(() => {
        console.log('memo')
        let filtered = [...tasks]; // создаем копию массива tasks

        if (props.filter === "active") {
            filtered = filtered.filter(t => !t.isDone);
        }
        if (props.filter === "completed") {
            filtered = filtered.filter(t => t.isDone);
        }

        return filtered;
    }, [props.filter, tasks]);


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
            <IconButton aria-label="delete" color={'secondary'} onClick={removeTodolist}>
                <Delete />
            </IconButton>

        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <div>
            {
                filteredTasks.map(t => {
                    return <Task key={t.id} task={t} todolistId={props.id}/>
                })
            }
        </div>
        <div>
            <MyButton color={'success'} variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler} title={'All'} />
            <MyButton color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler} title={'Active'} />
            <MyButton color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler} title={'Completed'} />
        </div>
    </div>
})


