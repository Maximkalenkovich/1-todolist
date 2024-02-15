import {FilterValuesType, TodolistType} from "../AppWithReducer";
import {v1} from "uuid";


export const todolistReducer = (state:TodolistType[],action:ActionTypeTodolist):TodolistType[] =>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id != action.payload.id)
        case "ADD-TODOLIST":
            const newTodo: TodolistType = {id:action.payload.todolistId, title:action.payload.title, filter: "all"}
            return [...state,newTodo]
        case "CHANGE-TODOLIST":
            return state.map(el => el.id == action.payload.id ? {...el,title:action.payload.title} : el)
        case "CHANGE-FILTER":
           return state.map(el => el.id == action.payload.id ? {...el,filter:action.payload.filter} : el)
        default: throw new Error('NON ACTION ')
    }
}
export type ActionTypeTodolist = RemoveTodolistACType | AddTodolistActionType | ChangeTodolistActionType | ChangeFilterTodolistActionType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const  removeTodolistAC = (id:string) => {
    return{
        type:"REMOVE-TODOLIST",
        payload:{
            id
        }
    }as const
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAction>
export const  addTodolistAction = (title:string) => {
    return{
        type:"ADD-TODOLIST",
        payload:{
            title,
            todolistId:v1()
        }
    }as const
}

type ChangeTodolistActionType = ReturnType<typeof changeTodolistAction>
export const  changeTodolistAction = (id:string,title:string) => {
    return{
        type:"CHANGE-TODOLIST",
        payload:{
            id,
            title

        }
    } as const
}


type  ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAction>
export const changeFilterTodolistAction = (id:string ,filter:FilterValuesType) => {
    return{
        type:"CHANGE-FILTER",
        payload:{
            id,
            filter
        }
    }as const
}