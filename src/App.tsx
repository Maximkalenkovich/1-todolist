import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";



function App() {

    const todoListTitle = 'what to learn'
    const [tasks, setTasks]  = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REACT", isDone: false}
    ])
    const [filterValue,setFilterValue] = useState<FilterValuesType>('All')
    const removeTask = (taskId: string) => {
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
