"use client";

import React from 'react'

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        completed: boolean;
    };
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
  return (
    <li>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
         />
         <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.title}
         </span>
         <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoItem