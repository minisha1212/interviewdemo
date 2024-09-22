// TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { addTask, updateTask } from './api';

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [loading, setLoading] = useState(false);
  
  
  
  const handleCloseTaskDetails = () => {
    onSuccess();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (task) {
        await updateTask({ ...task, name, description });
      } else {
        await addTask({ id: 0, name, description }); // Assuming id will be generated by the server
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Task Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseTaskDetails}></button>
              </div>
              <div className="modal-body">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <br/>
      <button type="submit" disabled={loading} className="btn btn-primary btn-block" >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default TaskForm;
