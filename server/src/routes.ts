import express from 'express';
//import multer from 'multer'; // Lib de upload de imagem
//import multerConfig from './config/multer'; // Config de upload de imagem
import { celebrate, Joi } from 'celebrate'; // Validacao de dados 

import UsersControllerr from './controllers/UsersController';

const routes = express.Router();
//const upload = multer(multerConfig);
const usersController = new UsersControllerr();

routes.use(express.json());
routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.post('/users',
celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}, {
    abortEarly: false
}), usersController.create);
routes.get('/uservalidate/:email/:password', usersController.validateUser);

export default routes;