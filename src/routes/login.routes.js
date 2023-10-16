import { Router } from "express";
import { check, validationResult } from 'express-validator';
import {
    Login,
  } from "../controllers/login.controllers.js";
const router = Router()



// Log in
router.post("/login",[
    check('rol').isIn(['Administrador/Propietario', 'Cajero (a)', 'Cliente']),
    check('identificación').notEmpty().isString(),
    check('contraseña').notEmpty().isString(),
  ], Login);



export default router