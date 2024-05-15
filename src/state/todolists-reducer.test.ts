import { addTodolistAC, ChangeTodolistTitleActionType, removeTodolistAC, todolistsReducer, changeTodolistTitleAC, changeTodolistFilterAC } from './todolists-reducer';
import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../AppWithRedux';
import { title } from 'process';

// Remove
test('correct todolits should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

// Added
test('correct todolits should be added', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newTodolistTitle = 'New TodoList';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe('all');
});

test('correct todolits should change its name', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newTodolistTitle = 'New TodoList';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should changed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
  
    const newFilter: FilterValuesType = 'completed';
  
    const startState: Array<TodolistType> = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];
  
    const action = changeTodolistFilterAC(todolistId2,newFilter)
    
    const endState = todolistsReducer(startState, action);
  
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});