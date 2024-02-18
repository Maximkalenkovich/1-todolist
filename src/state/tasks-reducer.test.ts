import {TasksStateType} from "../AppWithRedux";
import {
    addTasksActionCreate, changeStatusActionCreate, changeTaskTitleActionCreate,
    removeTaskActionCreate,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAction, removeTodolistAC} from "./todolist-reducer";



let startState: TasksStateType;

beforeEach(()=>{
    startState = {
    'todolistId1': [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ],
    'todolistId2': [
        {id: '1', title: "Milk", isDone: true},
        {id: '2', title: "React Book", isDone: true}
    ]
}})



test('checking for correct task deletion', () => {


    const action = removeTaskActionCreate('2', 'todolistId2')
    const endState = tasksReducer(startState, action)


    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
        ]
    })

})

test('checking add tasks function ', () => {


    const action = addTasksActionCreate('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('checking change tasks status function ', () => {


    const action = changeStatusActionCreate('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)

})
test('checking change title function', () => {

    const action = changeTaskTitleActionCreate('2', 'react hook', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe("JS");
    expect(endState['todolistId2'][1].title).toBe("react hook");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAction('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
