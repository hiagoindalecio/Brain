import express from 'express';
//import multer from 'multer'; // Lib de upload de imagem
//import multerConfig from './config/multer'; // Config de upload de imagem
import { celebrate, Joi } from 'celebrate'; // Validacao de dados 

import UsersControllerr from './controllers/UsersController';
import CheckController from './controllers/CheckController';

const routes = express.Router();
//const upload = multer(multerConfig);
const usersController = new UsersControllerr();
const checkController = new CheckController();

routes.use(express.json());
routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.get('/uservalidate/:email/:password', usersController.validateUser);
routes.get('/checkpoint/date/:userId', checkController.showByDate);
routes.post('/checkpoint/:userId',
    celebrate({
        body: Joi.object().keys({
            id_user: Joi.number().required(),
            summary: Joi.string().required(),
            description: Joi.string().required(),
            limitdate: Joi.string().required()
        })
    }, {
        abortEarly: false
    }), 
    checkController.create);
routes.post('/users',
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required()
        })
    }, {
        abortEarly: false
    }), 
    usersController.create);

export default routes;