"use client";

import React, { useEffect, useState } from 'react'
import AddTodoForm from './AddTodoForm';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import SortOptions from './SortOptions';

type Priority = 'low' | 'medium' | 'high';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
    tags: string[];
    priority: Priority;
    createdAt: number;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [tagFilter, setTagFilter] = useState<string>('');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('createdAt');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title: string, dueDate: string, tags: string[], priority: Priority) => {
        const newTodo = { id: uuidv4(), title, completed: false, dueDate, tags, priority, createdAt: Date.now() };
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

    const editTodo = (id: string, newTitle: string, newDueDate: string, newTags: string[], newPriority: Priority) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, title: newTitle, dueDate: newDueDate, tags: newTags, priority: newPriority } : todo
        ));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed' && !todo.completed) return false;
        if (filter === 'incomplete' && todo.completed) return false;
        if (tagFilter && !todo.tags.includes(tagFilter)) return false;
        if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;
        return true;
    });

    const sortedTodos = filteredTodos.sort((a, b) => {
        if (sortOption === 'createdAt') {
            return a.createdAt - b.createdAt;
        } else if (sortOption === 'dueDate') {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else if (sortOption === 'priority') {
            const priorityOrder: { [key in Priority]: number } = { low: 1, medium: 2, high: 3};
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortOption === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
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
            <div>
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
            <ul>
                {sortedTodos.map((todo) => (
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