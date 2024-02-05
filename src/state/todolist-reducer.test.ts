import {v1} from "uuid";
import {TodolistType} from "../App";
import {addTodolistAction, reducer, removeTodolistAC} from "./todolist-reducer";


test('correct todolist should be remowe',()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

  const endState = reducer(startState,removeTodolistAC(todolistId1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added',()=>{

    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTitle = 'New Title'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = reducer(startState,addTodolistAction(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})