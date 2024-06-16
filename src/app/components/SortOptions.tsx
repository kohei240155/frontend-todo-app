"use client";

import React from 'react'

interface SortOptionsProps {
    sortOption: string;
    setSortOption: (option: string) => void;
}

const SortOptions = ({ sortOption, setSortOption }: SortOptionsProps) => {
  return (
    <div>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="createdAt">Added Order</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
        </select>
    </div>
  )
}

export default SortOptions;