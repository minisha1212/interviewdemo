import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/new" element={<TaskForm onSuccess={() => {}} />} /> 
            <Route path="tasks/edit/:id" element={<TaskForm onSuccess={() => {}} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
