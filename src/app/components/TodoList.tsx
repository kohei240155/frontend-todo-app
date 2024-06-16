"use client";

import React, { useEffect, useState } from 'react'
import AddTodoForm from './AddTodoForm';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
    tags: string[];
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [tagFilter, setTagFilter] = useState<string>('');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title: string, dueDate: string, tags: string[]) => {
        const newTodo = { id: uuidv4(), title, completed: false, dueDate, tags };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: string, newTitle: string, newDueDate: string, newTags: string[]) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, title: newTitle, dueDate: newDueDate, tags: newTags } : todo
        ));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed' && !todo.completed) return false;
        if (filter === 'incomplete' && todo.completed) return false;
        if (tagFilter && !todo.tags.includes(tagFilter)) return false;
        return true;
    });

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodoForm addTodo={addTodo} />
            <TodoFilter filter={filter} setFilter={setFilter} />
            <div>
                <input
                    type="text"
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    placeholder="Filter by tag"
                />
            </div>
            <ul>
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;