import React from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {CheckBox} from "./Cheked";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeFilterTodolistAction, changeTodolistAction, removeTodolistAC} from "./state/todolist-reducer";
import {
    addTasksActionCreate,
    changeStatusActionCreate,
    changeTaskTitleActionCreate,
    removeTaskActionCreate
} from "./state/tasks-reducer";



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

export function TodolistWithRedux(props: PropsType) {


    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    let dispatch = useDispatch()

    const removeTodolist = () => dispatch(removeTodolistAC(props.id))



    const addTaskHandler = (title: string) => {
        dispatch(addTasksActionCreate(title, props.id))
    }

    const updateTodolistHandler=(title: string)=>{
       dispatch(changeTodolistAction(props.id,title))
    }

const onChangeHandlerStatus = (tID:string,checked:boolean) =>{
        dispatch(changeStatusActionCreate(tID,checked,props.id))
}

    const onAllClickHandler = () => dispatch(changeFilterTodolistAction(props.id,"all"));
    const onActiveClickHandler = () =>  dispatch(changeFilterTodolistAction(props.id,"active"));
    const onCompletedClickHandler = () =>  dispatch(changeFilterTodolistAction(props.id,"completed"));

            if (props.filter === "active") {
                tasks = tasks.filter(t => !t.isDone);
            }
            if (props.filter === "completed") {
                tasks = tasks.filter(t => t.isDone);
            }


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
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskActionCreate(t.id, props.id))
                    const updateTaskHandler = (title: string) => {
                        dispatch(changeTaskTitleActionCreate(props.id,t.id,title))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>

                        {/*<Checkbox defaultChecked color="success" checked={t.isDone}  onChange={onChangeHandler} />*/}
                 <CheckBox checked={t.isDone} callback={(checked)=>onChangeHandlerStatus(t.id,checked)}/>
                        <EditableSpan oldTitle={t.title} callBack={updateTaskHandler}/>
                        <IconButton aria-label="delete" color={'secondary'} onClick={onClickHandler}>
                            <Delete />
                        </IconButton>

                    </div>
                })
            }
        </div>
        <div>
            <Button color={'success'} variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


