import React, {useRef, useState} from "react";
import {Button} from "./Button";
import {isDisabled} from "@testing-library/user-event/dist/utils";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTasks: (title: string) => void
    changeToDoListFilter: (filterValue: FilterValuesType) => void

}



export function Todolist({
                             title,
                             addTasks,
                             tasks,
                             removeTask,
                             changeToDoListFilter
                         }: ToDoPropsType) {
    const [taskTitle,setTaskTitle] = useState('')



    const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                {/*удалить таску*/}
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is empty</span>

const onChangeSetTasksTitle = (e:any)=>{
    const inputTxt = e.target.value
    setTaskTitle(inputTxt)
}
// добавление новой таски
const onTasksHandler = ()=>{
   addTasks(taskTitle)
    setTaskTitle('')
}

    return (
        <div className='todolist'>
            <div>
                <h3>{title}</h3>
                <div>
                    <input value = {taskTitle} onChange={onChangeSetTasksTitle}/>
                    <Button title={'+'} isDisabled={!taskTitle} onClickHandler={onTasksHandler}/>
                </div>
                {tasksList}
                <div>
                    <Button title={'All'} onClickHandler={() => changeToDoListFilter('All')}/>
                    <Button title={'Active'} onClickHandler={() => changeToDoListFilter('Active')}/>
                    <Button title={'Completed'} onClickHandler={() => changeToDoListFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}