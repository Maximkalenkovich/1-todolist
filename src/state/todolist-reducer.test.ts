import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {
    addTodolistAction,
    changeFilterTodolistAction,
    changeTodolistAction,
    removeTodolistAC, todolistReducer
} from "./todolist-reducer";


let todolistId2:string
let todolistId1:string
let startState:TodolistType[]

beforeEach(()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]})

test('correct todolist should be remowe',()=>{

  const endState = todolistReducer(startState,removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added',()=>{

    const newTitle = 'New Title'
    const endState = todolistReducer(startState,addTodolistAction(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('change todolist',()=>{


    const newTitle = 'New Title'
    const action = {
        type: "CHANGE-TODOLIST",
        id:todolistId2,
        title:newTitle
    }

    const endState = todolistReducer(startState, changeTodolistAction(todolistId2,newTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})

test('change FILTER TODOLIST',()=>{

    const newFilter: FilterValuesType = 'completed'

    const action = {
        type: "CHANGE-FILTER",
        id:todolistId2,
        title:newFilter
    }

    const endState = todolistReducer(startState, changeFilterTodolistAction(todolistId2,newFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})



