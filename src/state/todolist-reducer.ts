import {TodolistType} from "../App";


export const reducer = (state:TodolistType[],action:ActionTypeTodolist):TodolistType[] =>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id != action.payload.id)
        default: throw new Error('NON ACTION ')
    }
}
type ActionTypeTodolist = RemoveTodolistACType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const  removeTodolistAC = (id:string) => {
    return{
        type:"REMOVE-TODOLIST",
        payload:{id}
    }as const
}