import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Section from './Section/Section';
import Table from './Table/Table';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [editItem, setEditItem] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = (item) => {
    let updatedData = [];

    switch (activeTab) {
      case 'users':
        updatedData = users.filter((user) => user.id !== item.id);
        setUsers(updatedData);
        break;
      case 'tasks':
        updatedData = tasks.filter((task) => task.id !== item.id);
        setTasks(updatedData);
        break;
      case 'files':
        updatedData = files.filter((file) => file.id !== item.id);
        setFiles(updatedData);
        break;
      default:
        break;
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleAddFile = (newFile) => {
    setFiles([...files, newFile]);
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'home':
        return <Table data={genericUsers} />;
      case 'users':
        return <Table data={users} columns={userColumns} onDelete={handleDelete} onEdit={handleEdit} />;
      case 'tasks':
        return <Table data={tasks} columns={taskColumns} onDelete={handleDelete} onEdit={handleEdit} />;
      case 'files':
        return <Table data={files} columns={filesColumns} onDelete={handleDelete} onEdit={handleEdit} />;
      default:
        return null;
    }
  };

  const genericUsers = [
    // Generic user data...
  ];
  
  const userColumns = ['name', 'email', 'role'];
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'member' },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'member' },
    { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'member' },
  ]);
  const taskColumns = ['title', 'description', 'status'];
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description of Task 1', status: 'pending' },
    { id: 2, title: 'Task 2', description: 'Description of Task 2', status: 'completed' },
    { id: 3, title: 'Task 2', description: 'Description of Task 2', status: 'completed' },
    { id: 4, title: 'Task 2', description: 'Description of Task 2', status: 'completed' },
  ]);
  const filesColumns = ['name', 'size', 'type'];
  const [files, setFiles] = useState([
    { id: 1, name: 'File 1', size: '10 KB', type: 'PDF' },
    { id: 2, name: 'File 2', size: '5 MB', type: 'Image' },
    { id: 3, name: 'File 2', size: '5 MB', type: 'Image' },
    { id: 4, name: 'File 2', size: '5 MB', type: 'Image' },
    { id: 5, name: 'File 2', size: '5 MB', type: 'Image' },
  ]);

  return (
    <Router>
      <header className="header">
        <nav className="nav navegation">
          <div className="nav__logo-container">
            <a className="nav__logo" href="#">Dashboard</a>
          </div>
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to="/"
                  className={activeTab === 'home' ? 'nav__link active' : 'nav__link'}
                  onClick={() => handleTabClick('home')}
                >
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/users"
                  className={activeTab === 'users' ? 'nav__link active' : 'nav__link'}
                  onClick={() => handleTabClick('users')}
                >
                  Users
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/tasks"
                  className={activeTab === 'tasks' ? 'nav__link active' : 'nav__link'}
                  onClick={() => handleTabClick('tasks')}
                >
                  Tasks
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/files"
                  className={activeTab === 'files' ? 'nav__link active' : 'nav__link'}
                  onClick={() => handleTabClick('files')}
                >
                  Files
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="main">
        <Section title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}>
          <Routes>
            <Route
              path="/users"
              element={
                <>
                  <Table data={users} columns={userColumns} onDelete={handleDelete} onEdit={handleEdit} />
                  <UserForm onAddUser={handleAddUser} />
                </>
              }
            />
            <Route
              path="/tasks"
              element={
                <>
                  <Table data={tasks} columns={taskColumns} onDelete={handleDelete} onEdit={handleEdit} />
                  <TaskForm onAddTask={handleAddTask} />
                </>
              }
            />
            <Route
              path="/files"
              element={
                <>
                  <Table data={files} columns={filesColumns} onDelete={handleDelete} onEdit={handleEdit} />
                  <FileForm onAddFile={handleAddFile} />
                </>
              }
            />
            <Route path="/" element={<Table data={genericUsers} columns={taskColumns} onDelete={handleDelete} onEdit={handleEdit} />} />
          </Routes>
        </Section>
      </main>

      <footer className="footer"></footer>
    </Router>
  );
};

const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
    };

    onAddUser(newUser);

    setName('');
    setEmail('');
    setRole('');
  };

  return (
    <div className='form-add'>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    onAddTask(newTask);

    setTitle('');
    setDescription('');
    setStatus('');
  };

  return (
    <div className='form-add'>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

const FileForm = ({ onAddFile }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFile = {
      id: Date.now(),
      name,
      size,
      type,
    };

    onAddFile(newFile);

    setName('');
    setSize('');
    setType('');
  };

  return (
    <div className='form-add'>
      <h2>Add File</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Size</label>
          <input type="text" className="form-control" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add File</button>
      </form>
    </div>
  );
};

export default Dashboard;
