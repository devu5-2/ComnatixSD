// userRoute.js
import express from 'express';
import { create, getAll, getOne, update, deleteTask } from '../controller/userController.js';

const router = express.Router();

// Define routes
router.post('/create', create);
router.get('/getall', getAll);
router.get('/getone/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteTask);

// Wrap the router export to accept db instance
export default (db) => {
    // Pass db to controller functions
    return router;
};
