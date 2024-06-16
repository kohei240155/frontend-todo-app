"use client";

import React, { useState } from 'react'

interface AddTodoFormProps {
    addTodo: (title: string, dueDate: string, tags: string[]) => void;
}

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(',').map(tag => tag.trim()));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && dueDate.trim()) {
            addTodo(title, dueDate, tags);
            setTitle('');
            setDueDate('');
            setTags([]);
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
             <input
                type="text"
                value={tags.join(', ')}
                onChange={handleTagChange}
                placeholder="Add tags separated by commas"
             />
             <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;