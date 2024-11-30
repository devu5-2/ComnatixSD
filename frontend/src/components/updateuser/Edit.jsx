import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        title: "",
        description: "",
        duedate: "",
        status: "Pending"
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    }

    useEffect(() => {
        axios.get(`http://localhost:7000/api/getone/${id}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    const toggleStatus = () => {
        // Toggle status between "Pending" and "Completed"
        setUser({ ...user, status: user.status === "Pending" ? "Completed" : "Pending" });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:7000/api/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/")
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='backpic'>
            <div className='addUser'>
                <Link to={"/"} className='addButton'>Back</Link>
                <h2 className='heading2'>Update Task</h2>
                <form className='addUserForm' onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="title">Title :</label>
                        <input type="text" value={user.title} onChange={inputChangeHandler} id="title" name="title" autoComplete='off' placeholder='Title' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="description">Description :</label>
                        <input type="text" value={user.description} onChange={inputChangeHandler} id="description" name="description" autoComplete='off' placeholder='Description' />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="duedate">Due date :</label>
                        <input type="date" value={user.duedate} onChange={inputChangeHandler} id="duedate" name="duedate" autoComplete='off' placeholder='Due Date' />
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
                        <button type="submit">UPDATE TASK</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit