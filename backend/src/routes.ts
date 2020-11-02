import {Router} from "express";
import multer from 'multer';

import uploadConfig from './config/upload'
import authMiddleware from './middlewares/authMiddleware'
import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UsersController'
import AuthController from './controllers/AuthController'

const routes = Router();
const upload = multer(uploadConfig)

//Orphanages
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array('images'), OrphanagesController.create);

//Users
routes.get("/users/auth", AuthController.authenticate)
routes.get("/users/auth/test", authMiddleware, AuthController.authTest)
routes.post("/users", UsersController.create)

export default routes;