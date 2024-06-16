"use client";

import React, { useState } from 'react'

interface AddTodoFormProps {
    addTodo: (title: string, dueDate: string) => void;
}

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && dueDate.trim()) {
            addTodo(title, dueDate);
            setTitle('');
            setDueDate('');
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
             <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
             />
             <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;