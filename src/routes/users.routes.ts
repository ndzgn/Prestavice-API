import { Router } from "express";
import * as usersController from "../controllers/UserController"

const router = Router()

//Toutes les routes necessitent l'authentification

router.get("/", usersController.findAll)
router.get("/:id", usersController.findUserById)
router.post("/", usersController.createUser)
router.delete("/:id", usersController.deleteUser)
router.put("/:id", usersController.updatedUser)

export default router