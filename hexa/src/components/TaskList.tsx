// TaskList.tsx
import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { fetchTasks, deleteTask, addTask } from './api';
import TaskForm from './TaskForm';
import Swal from 'sweetalert2';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
  const [showForm, setShowForm] = useState(false); 
  const [editingTask, setEditingTask] = useState<Task | null>(null); 

  useEffect(() => {
    const loadTasks = async () => {
      const { tasks, totalPages } = await fetchTasks(page, 10);
      setTasks(tasks);
      setTotalPages(totalPages);
    };
    loadTasks();
  }, [page]);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was a problem deleting the task.',
          'error'
        );
      }
    }
  };

  const handleOpenTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
  };

  const handleShowForm = (task?: Task) => {
    setEditingTask(task || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleTaskCreatedOrUpdated = async () => {
    const { tasks, totalPages } = await fetchTasks(page, 10);
    setTasks(tasks);
    setTotalPages(totalPages);
    handleCloseForm();
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <button className="btn btn-success mb-3" onClick={() => handleShowForm()}>
        Add New Task
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleOpenTask(task)}
                >
                  Show
                </button>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleShowForm(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Task Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseTask}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedTask.id}</p>
                <p><strong>Name:</strong> {selectedTask.name}</p>
                <p><strong>Description:</strong> {selectedTask.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseTask}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSuccess={handleTaskCreatedOrUpdated}
         
        />
      )}
    </div>
  );
};

export default TaskList;
