import React, {useState, KeyboardEvent} from "react";
import {Button} from "./Button";


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
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    filterValue: FilterValuesType

}


export function Todolist({
                             title,
                             addTasks,
                             tasks,
                             removeTask,
                             changeToDoListFilter,
                             changeTaskStatus,
                             filterValue
                         }: ToDoPropsType) {
    const [taskTitle, setTaskTitle] = useState('')


    const listItems: Array<JSX.Element> = tasks.map((task: TaskType) => {
        return (
            <li key={task.id} className={task.isDone ? 'task-done':'task'}>
                <input type="checkbox" checked={task.isDone}
                onChange={(e)=>changeTaskStatus(task.id, e.currentTarget.checked )}/>
                <span>{task.title}</span>
                {/*удалить таску*/}
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is empty</span>


// добавление новой таски
    const addTasksHandler = () => {
        const trimmedTasksTitle = taskTitle.trim()
        if (trimmedTasksTitle) {
            addTasks(taskTitle)
        } else {
            alert('not understand')
        }

        setTaskTitle('')
    }
    const addTaskHandlerKeyBoard = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitle) {
            addTasksHandler()
        }
    }
    return (
        <div className='todolist'>
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle}
                        onChange={(e) => {
                        setTaskTitle(e.target.value)
                    }}

                        onKeyDown={addTaskHandlerKeyBoard}/>
                    <Button  title={'+'} isDisabled={!taskTitle} onClickHandler={addTasksHandler}/>
                </div>
                {tasksList}
                <div>
                    <Button classes={filterValue === 'All' ? 'btn-active': ''} title={'All'} onClickHandler={() => changeToDoListFilter('All')}/>
                    <Button classes={filterValue === 'Active' ? 'btn-active': ''} title={'Active'} onClickHandler={() => changeToDoListFilter('Active')}/>
                    <Button classes={filterValue === 'Completed' ? 'btn-active': ''} title={'Completed'} onClickHandler={() => changeToDoListFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}
