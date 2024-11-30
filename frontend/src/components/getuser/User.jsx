import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom'

const User = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7000/api/getall");
                setUsers(response.data);
                setFilteredUsers(response.data);  
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    }, []);

    const filterTasks = (status) => {
        setStatusFilter(status);

        if (status === "All") {
            setFilteredUsers(users); // Show all tasks
        } else {
            const filtered = users.filter((user) => user.status === status);
            setFilteredUsers(filtered);
        }
    };

   

const deleteUser = async (userId) => { 
    if (!userId) {
      toast.error('Invalid task ID');
      return;
    }
  
    // Show a custom confirmation toast
    const confirmationToast = toast((t) => (
      <div className="confirmation-toast">
        <p className="toast-message">Are you sure you want to delete this task?</p>
        <div className="toast-buttons">
          <button
            className="toast-button confirm-button"
            onClick={async () => {
              try {
                const response = await axios.delete(`http://localhost:7000/api/delete/${userId}`);
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                toast.success(response.data.msg, { position: 'top-right' });
                toast.dismiss(t.id); // Dismiss the confirmation toast
              } catch (error) {
                toast.error('Failed to delete task. Please try again.');
                toast.dismiss(t.id);
              }
            }}
          >
            Confirm
          </button>
          <button
            className="toast-button cancel-button"
            onClick={() => toast.dismiss(t.id)} // Dismiss the confirmation toast if canceled
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity }); // Keep the toast until the user clicks a button
  };
  

    return (
        <div className='backpic'>
            <div className='userTable'>
                <h1 className='heading'>Task Manager</h1>
                {/* Filters Section */}
                
                <div className="filters">
                <Link to={"/add"} className='addButton'>Add Task</Link>

                    <label htmlFor="statusFilter">Filter by Status: 
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => filterTasks(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    </label>
                </div>



                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Title </th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.title}</td>
                                        <td>{user.description}</td>
                                        <td>{user.duedate}</td>
                                        <td>{user.status}</td>

                                        <td className='actionButtons'>
                                            <button onClick={() => deleteUser(user.id)}><i className="fa-solid fa-trash"></i></button>
                                            <Link to={`/edit/` + user.id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User