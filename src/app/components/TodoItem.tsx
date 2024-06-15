"use client";

import React, { useState } from 'react'

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        completed: boolean;
    };
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, title: string) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editTodo(todo.id, newTitle);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
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
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </span>
            ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                    {todo.title}
                </span>
            )}
            <button onClick={handleEdit} disabled={isEditing}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;