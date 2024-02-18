import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistACType} from "./todolist-reducer";




export type RemomeTasksActionCreateType=ReturnType<typeof removeTaskActionCreate>
export type AddTasksActionCreateType=ReturnType<typeof addTasksActionCreate>
export type ChangeStatusActionCreateType=ReturnType<typeof changeStatusActionCreate>
export type ChangeTaskTitleActionCreateType=ReturnType<typeof changeTaskTitleActionCreate>



type ActionTypeTodolist =
    RemomeTasksActionCreateType|
    AddTasksActionCreateType|
    ChangeStatusActionCreateType|
    ChangeTaskTitleActionCreateType|
    AddTodolistActionType|RemoveTodolistACType

let initialState:TasksStateType = {}

export const tasksReducer = (state:TasksStateType = initialState,action:ActionTypeTodolist):TasksStateType =>{
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.taskId )
            }
        case "ADD-TASKS":
            return(
                {
                    ...state,
                    [action.todolistId]:[{id: v1(), title: action.title, isDone: false},...state[action.todolistId]]
                }
            )
        case "CHANGE-STATUS":
            return (
                {
                ...state,
                [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId ? {...task,isDone:action.isDone}:task )
            }
            )
        case "CHANGE-TITLE":

        return {
            ...state,[action.todolistId]:state[action.todolistId].map((t)=>t.id === action.taskId?{...t,title:action.newTitle}:t)
        }
        case 'ADD-TODOLIST':
  return {
      ...state,[action.payload.todolistId]:[]
  }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
        delete copyState[action.payload.id]
            return copyState
        default: return state
    }
}


export const  removeTaskActionCreate= (taskId:string,todolistId:string)=> {
    return{
        type:'REMOVE-TASK', taskId,todolistId
    }as const
}

export const  addTasksActionCreate= (title:string,todolistId:string)=> {
    return{
        type:"ADD-TASKS",title,todolistId
    }as const
}
export const   changeStatusActionCreate= (taskId:string,isDone:boolean,todolistId:string)=> {
    return{
        type:"CHANGE-STATUS",taskId,isDone,todolistId
    }as const
}
export const   changeTaskTitleActionCreate= (taskId:string,newTitle:string,todolistId:string)=> {
    return{
        type:"CHANGE-TITLE",taskId,newTitle,todolistId
    }as const
}



