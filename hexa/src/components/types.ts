export interface Task {
    id: number;
    name: string;
    description: string;
  }
  

  export interface FetchTasksResponse {
    tasks: Task[];
    totalPages: number;
  }