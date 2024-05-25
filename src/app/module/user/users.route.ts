import express from 'express'
// import usersController from './user.controller'
// import validedRequest from '../../middleware/validedRequest'
// import { UserValidation } from './user.validation'
import userController from './user.controller'
const router =  express.Router()
router.post('/create-user',userController.createUser)

export const UserRoutes =router