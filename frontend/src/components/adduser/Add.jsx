import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

    const users = {
        title: "",
        description: "",
        duedate: "",
        status: "Pending"
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const toggleStatus = () => {
        // Toggle status between "Pending" and "Completed"
        setUser({ ...user, status: user.status === "Pending" ? "Completed" : "Pending" });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/api/create", user);
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/");
        } catch (error) {
            console.error("Error during submission:", error.response?.data || error.message);
            toast.error("Failed to create task.", { position: "top-right" });
        }
    };
    

    return (
        <div className='backpic'>
            <div className='addUser'>
                <Link to={"/"} className='addButton'>Back</Link>
                <h2 className='heading2'>Add New Task</h2>
                <form className='addUserForm' onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="title">Title :</label>
                        <input type="text" onChange={inputHandler} id="title" name="title" autoComplete='off' placeholder='Title' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="description">Description :</label>
                        <input type="text" onChange={inputHandler} id="description" name="description" autoComplete='off' placeholder='Description' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="duedate">Due Date :</label>
                        <input type="date" onChange={inputHandler} id="duedate" name="duedate" autoComplete='off' placeholder='Due Date' />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="status">Status :</label>
                        <div className='sep'>
                        <div className='seperate'>
                            <label className='switch'>
                                <input 
                                    type="checkbox" 
                                    checked={user.status === "Completed"} 
                                    onChange={toggleStatus} 
                                />
                                <span className='slider round'></span>
                                </label>
                                </div>
                                <div className='Astatus'>
                                {user.status === "Completed" ? "Completed" : "Pending"}
                                </div>
                                </div>
                    </div>
                    <div className="inputGroup">
                        <button type="submit">ADD TASK</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add;