import { runAsync, allAsync, getAsync } from '../model/userModel.js';

// Create a new task
export const create = async (req, res) => {
    const { title, description, duedate, status } = req.body;

    if (!title || !description || !duedate || !status) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const query = "INSERT INTO tasks (title, description, duedate, status) VALUES (?, ?, ?, ?)";

    try {
        const result = await runAsync(query, [title, description, duedate, status]);
        res.status(200).json({ msg: "Task created successfully", taskId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all tasks
export const getAll = async (req, res) => {
    const query = "SELECT id, title, description, duedate, status FROM tasks";

    try {
        const rows = await allAsync(query, []);
        if (rows.length === 0) {
            return res.status(404).json({ msg: "No tasks found" });
        }
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one task by ID
export const getOne = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM tasks WHERE id = ?";

    try {
        const row = await getAsync(query, [id]);
        if (!row) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a task by ID
export const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, duedate, status } = req.body;

    if (!title || !description || !duedate || !status) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const query = "UPDATE tasks SET title = ?, description = ?, duedate = ?, status = ? WHERE id = ?";

    try {
        const result = await runAsync(query, [title, description, duedate, status, id]);
        if (result.changes === 0) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Task updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM tasks WHERE id = ?";

    try {
        const result = await runAsync(query, [id]);
        if (result.changes === 0) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
