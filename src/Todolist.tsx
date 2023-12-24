import React from "react";
import {Button} from "./Button";

export type FilterValuesType = "All"|"Active"|"Completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string ) => void
    changeToDoListFilter : (filterValue: FilterValuesType ) => void

}

export function Todolist({title, tasks,removeTask, changeToDoListFilter}: ToDoPropsType) {
    // 1.
    // const title = props.title
    // const tasks = props.tasks
     // 2.
    // const {title, tasks} = props
    // const listItems: Array<JSX.Element> = []
    // for (let i = 0; i < tasks.length; i++) {
    //     const listItem: JSX.Element = <li><input type="checkbox" checked={tasks[i].isDone}/>
    //         <span>{tasks[i].title}</span>
    //         <button onClick={()=> removeTask(tasks[i].id)}>x</button></li>
    //     listItems.push(listItem)
    // }

    const listItems: Array<JSX.Element>= tasks.map((task:TaskType)=>{
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=> removeTask(task.id)}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length !== 0
    ? <ul>{listItems}</ul>
        :<span>Tasks list is empty</span>


    return (
        <div className='todolist'>
            {/*<TodolistHeader />*/}
            {/*<AddTaskForm />*/}
            {/*<TasksList />*/}
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title={'+'}/>
                </div>
                {tasksList}
                <div>
                    <Button title={'All'} onClickHanger={()=>changeToDoListFilter('All')}/>
                    <Button title={'Active'} onClickHanger={()=>changeToDoListFilter('Active')}/>
                    <Button title={'Completed'} onClickHanger={()=>changeToDoListFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}