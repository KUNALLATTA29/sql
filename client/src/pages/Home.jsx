
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axiosConfig';
import AuthContext from '../auth/AuthContext';

const Home = () => {
    const { logout, token } = useContext(AuthContext);
    const [taskName, setTaskName] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [remark, setRemark] = useState('');
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/api/tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/api/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const response = await axiosInstance.get('/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchTasks();
        fetchUsers();
        fetchCurrentUser();
    }, [token]);

    const handleAssignTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                '/api/tasks',
                { name: taskName, assignTo, assignBy: currentUser.id, remark },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, response.data]);
            setTaskName('');
            setAssignTo('');
            setRemark('');
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Home Page</h2>
                <button onClick={logout} className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                    Logout
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-bold">Assign Task</h3>
                        <form onSubmit={handleAssignTask} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <select
                                value={assignTo}
                                onChange={(e) => setAssignTo(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Remark"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                Assign Task
                            </button>
                        </form>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Tasks Assigned to You</h3>
                        <ul className="space-y-4">
                            {tasks.map((task) => (
                                <li key={task.id} className="p-4 border rounded">
                                    <p><strong>Task Name:</strong> {task.name}</p>
                                    <p><strong>Assigned By:</strong> {task.assignedByUser ? task.assignedByUser.name : 'Unknown'}</p>
                                    <p><strong>Remark:</strong> {task.remark}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;