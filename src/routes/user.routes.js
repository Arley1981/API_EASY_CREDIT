import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
  } from "../controllers/user.controllers.js";
const router = Router()

// GET all users
router.get("/user", getUsers);

// GET An User
router.get("/user/:id", getUser);

// DELETE An User
router.delete("/user/:id", deleteUser);

// INSERT An User
router.post("/user", createUser);

// UPDATE An User
router.patch("/user/:id", updateUser);

export default router