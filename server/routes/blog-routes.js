import express from 'express';
import { addBlog, deleteBlog,  getAllBlogs, getById, getByUserId, updateBlog } from '../controllers/blogController.js';

const route = express.Router();

route.get("/",getAllBlogs);
route.post("/add",addBlog);
route.put("/update/:id",updateBlog);
route.get('/:id',getById);
route.delete("/delete/:id",deleteBlog);
route.get('/user/:id',getByUserId)

export default route;