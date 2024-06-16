"use client";

import React, { useState } from 'react'

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        completed: boolean;
        dueDate: string;
        tags: string[];
    };
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, title: string, dueDate: string, tags: string[]) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDueDate, setNewDueDate] = useState(todo.dueDate);
    const [newTags, setNewTags] = useState(todo.tags.join(', '));

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editTodo(todo.id, newTitle, newDueDate, newTags.split(',').map(tag => tag.trim()));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
        setNewDueDate(todo.dueDate);
        setNewTags(todo.tags.join(', '));
        setIsEditing(false);
    };

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
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </span>
            ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                    {todo.title} (Due: {todo.dueDate}) [Tags: {todo.tags.join(', ')}]
                </span>
            )}
            <button onClick={handleEdit} disabled={isEditing}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;