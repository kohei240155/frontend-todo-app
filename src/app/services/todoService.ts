const API_BASE_URL = 'http://localhost:8080/api';

export const getTodos = async () => {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

export const createTodo = async (todo: { title: string; completed: boolean; tags: string[]; priority: string}) => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
};