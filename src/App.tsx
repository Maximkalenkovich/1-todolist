import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, Todolist} from "./Todolist";



function App() {

    const todoListTitle = 'what to learn'

    const [tasks, setTasks]  = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
        {id: 4, title: "REACT", isDone: false}
    ])

    const [filterValue,setFilterValue] = useState<FilterValuesType>('All')

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter( t=> t.id !== taskId))
    }

    const changeToDoListFilter = (filterValue: FilterValuesType ) => {
        setFilterValue(filterValue)
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        return  filter === "Active"
            ? tasks.filter(t => t.isDone === false)
            : filter === "Completed"
                ? tasks.filter(t => t.isDone === true)
                :tasks
    }
    const filteredTasks= getFilteredTasks(tasks,filterValue)



    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={filteredTasks}
                      removeTask={removeTask}
            changeToDoListFilter={changeToDoListFilter}/>
        </div>
    );
}
export default App;
