import { Router } from "express";
import {
    createClient,
    deleteClient,
    getClient,
    getClients,
    updateClient,
  } from "../controllers/client.controllers.js";
const router = Router()

// GET all Clients
router.get("/client", getClients);

// GET An Client
router.get("/client/:id", getClient);

// DELETE An Client
router.delete("/client/:id", deleteClient);

// INSERT An Client
router.post("/client", createClient);

// UPDATE An Client
router.patch("/client/:id", updateClient);

export default router