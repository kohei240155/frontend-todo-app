const API_BASE_URL = 'http://localhost:8080/api';

export const getTodos = async () => {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};