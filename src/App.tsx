import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {

    const todoListTitle = 'what to learn'
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REACT", isDone: false}
    ])
    const [filterValue, setFilterValue] = useState<FilterValuesType>('All')

    // удалить таску
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    // добавить таску
    const addTasks = (title: string) => {
        //ы создаем новый массив nextState, который состоит из новой задачи newTasks и всех существующих задач из массива tasks. Мы используем оператор распространения ... для развертывания элементов из tasks в новый массив nextState. Таким образом, новая задача будет добавлена в начало массива.
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeToDoListFilter = (filterValue: FilterValuesType) => {
        setFilterValue(filterValue)
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: TaskType[] = tasks.map((t) => t.id === taskId ? {...t, isDone: newIsDoneValue } : t)
        setTasks(nextState)
    }

    // фильтрация на active all completed
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        return filter === "Active"
            ? tasks.filter(t => t.isDone === false)
            : filter === "Completed"
                ? tasks.filter(t => t.isDone === true)
                : tasks
    }
    const filteredTasks = getFilteredTasks(tasks, filterValue)


    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}
                      addTasks={addTasks}
                      changeTaskStatus={changeTaskStatus}
            filterValue={filterValue}/>
        </div>
    );
}

export default App;
