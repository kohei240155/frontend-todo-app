"use client";

import React, { useState } from 'react'
import AddTodoForm from './AddTodoForm';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (title: string) => {
        const newTodo = { id: uuidv4(), title, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodoForm addTodo={addTodo} />
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;