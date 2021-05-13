import { Router } from "express"

import { login, register, signUp } from "../controllers/users/auth"
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/users/index"

const router: Router = Router()



router.get("/users", getUsers)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

router.post('/')

router.post("/auth/signup", signUp)

router.post("/auth/login", login)

router.post("/auth/register", register)


export default router