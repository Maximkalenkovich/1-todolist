import React, {useRef} from "react";
import {Button} from "./Button";

type FilterValuesType = "All" | "Active" | "Completed"

type TaskType = {
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



 function Todolist({
                             title,
                             addTasks,
                             tasks,
                             removeTask,
                             changeToDoListFilter
                         }: ToDoPropsType) {

//useref чтобы обратиться к input
    const tasksTitleInput = useRef<HTMLInputElement>(null)

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


// добавление новой таски
    function addTasksHandler(){
        if(tasksTitleInput.current){
            const newTasksTitle = tasksTitleInput.current.value
            addTasks(newTasksTitle)
            tasksTitleInput.current.value = ''
        }
    }


    return (
        <div className='todolist'>
            {/*<TodolistHeader />*/}
            {/*<AddTaskForm />*/}
            {/*<TasksList />*/}
            <div>
                <h3>{title}</h3>
                <div>
                    <input ref={tasksTitleInput}/>
                    <Button title={'+'} onClickHandler={addTasksHandler}/>
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