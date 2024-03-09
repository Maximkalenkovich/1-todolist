import {CheckBox} from "../chekbox/Cheked";
import {EditableSpan} from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import React, {memo, useCallback} from "react";
import {TaskType} from "../todolist/TodolistWithRedux";
import {changeStatusActionCreate, changeTaskTitleActionCreate, removeTaskActionCreate} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";


export type TaskPropsType ={
    task:TaskType
    todolistId:string
}

export const Task = memo(({ task, todolistId }: TaskPropsType) => {

    const dispatch = useDispatch();

    const onChangeHandlerStatus = useCallback((checked: boolean) => {
            dispatch(changeStatusActionCreate(task.id, checked, todolistId));
        },[task.id,todolistId,dispatch]);

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskActionCreate(task.id,todolistId));
    },[task.id,todolistId,dispatch]);

    const updateTaskHandler = useCallback((title: string) => {
            dispatch(changeTaskTitleActionCreate(task.id, title, todolistId))},[dispatch,todolistId,task.id]);

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <CheckBox checked={task.isDone} callback={onChangeHandlerStatus} />
            <EditableSpan oldTitle={task.title} callBack={updateTaskHandler} />
            <IconButton
                aria-label="delete"
                color="secondary"
                onClick={onClickHandler}
            >
                <Delete />
            </IconButton>
        </div>
    );
})
