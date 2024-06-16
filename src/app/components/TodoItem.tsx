"use client";

import React, { useState } from 'react'

type Priority = 'low' | 'medium' | 'high';

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        completed: boolean;
        dueDate: string;
        tags: string[];
        priority: Priority;
        createdAt: number;
    };
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, title: string, dueDate: string, tags: string[], priority: Priority) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDueDate, setNewDueDate] = useState(todo.dueDate);
    const [newTags, setNewTags] = useState(todo.tags.join(', '));
    const [newPriority, setNewPriority] = useState<Priority>(todo.priority);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editTodo(todo.id, newTitle, newDueDate, newTags.split(',').map(tag => tag.trim()), newPriority);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
        setNewDueDate(todo.dueDate);
        setNewTags(todo.tags.join(', '));
        setNewPriority(todo.priority);
        setIsEditing(false);
    };

    const formattedDate = new Date(todo.createdAt).toLocaleString();

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            {isEditing ? (
                <span>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input
                        type="date"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                    />
                    <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                    />
                    <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as Priority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </span>
            ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                    {todo.title} (Due: {todo.dueDate}) [Tags: {todo.tags.join(', ')}] (priority: {todo.priority}) (Added: {formattedDate})
                </span>
            )}
            <button onClick={handleEdit} disabled={isEditing}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;