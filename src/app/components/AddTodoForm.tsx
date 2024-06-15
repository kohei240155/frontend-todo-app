"use client";

import React, { useState } from 'react'

interface AddTodoFormProps {
    addTodo: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add a new todo'
             />
             <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;