import {TodolistType} from "../App";
import {v1} from "uuid";


export const reducer = (state:TodolistType[],action:ActionTypeTodolist):TodolistType[] =>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id != action.payload.id)
        case "ADD-TODOLIST":
            const todolistId = v1()
            const newTodo: TodolistType = {id: todolistId, title:action.payload.title, filter: "all"}
            return [...state,newTodo]
        default: throw new Error('NON ACTION ')
    }
}
type ActionTypeTodolist = RemoveTodolistACType | AddTodolistActionType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const  removeTodolistAC = (id:string) => {
    return{
        type:"REMOVE-TODOLIST",
        payload:{id}
    }as const
}

type AddTodolistActionType = ReturnType<typeof addTodolistAction>
export const  addTodolistAction = (title:string) => {
    return{
        type:"ADD-TODOLIST",
        payload:{title}
    }as const
}