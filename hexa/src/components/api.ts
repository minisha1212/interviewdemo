// api.ts
import axios from 'axios';
import { Task,FetchTasksResponse } from './types';

const API_URL = 'http://127.0.0.1:5000/api/tasks';

export const fetchTasks = async (page: number, limit: number): Promise<FetchTasksResponse> => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      const data = response.data;
  
      // Ensure the API response is mapped correctly
      return {
        tasks: data.tasks || [], // Default to empty array if tasks are not present
        totalPages: data.totalpages || 0 // Default to 0 if totalpages is not present
      };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return {
        tasks: [],
        totalPages: 0
      };
    }
  };

export const addTask = async (task: Task): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
