import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist:(todolistId: string,title: string)=>void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTodolistHandler=(title: string)=>{
        props.updateTodolist(props.id,title)
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
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    const updateTaskHandler = (title: string) => {
                        props.updateTask(props.id,t.id,title)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>

                        {/*<Checkbox defaultChecked color="success" checked={t.isDone}  onChange={onChangeHandler} />*/}
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                            icon={<FavoriteBorderIcon />}
                            checkedIcon={<FavoriteIcon />}
                        />
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


