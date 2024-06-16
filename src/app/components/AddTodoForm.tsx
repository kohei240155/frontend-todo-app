"use client";

import React, { useState } from 'react'

type Priority = 'low' | 'medium' | 'high';
interface AddTodoFormProps {
    addTodo: (title: string, dueDate: string, tags: string[], priority: Priority) => void;
}

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [priority, setPriority] = useState<Priority>('low');

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(',').map(tag => tag.trim()));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && dueDate.trim()) {
            addTodo(title, dueDate, tags, priority);
            setTitle('');
            setDueDate('');
            setTags([]);
            setPriority('low');
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
             <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
             </select>
             <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;