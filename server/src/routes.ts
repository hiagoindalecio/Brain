import express from 'express';
//import multer from 'multer'; // Lib de upload de imagem
//import multerConfig from './config/multer'; // Config de upload de imagem
import { celebrate, Joi } from 'celebrate'; // Validacao de dados 

import UsersControllerr from './controllers/UsersController';
import CheckController from './controllers/CheckController';
import TaskControler from './controllers/TasksController';
import NotesController from './controllers/NotesController';

const routes = express.Router();
//const upload = multer(multerConfig);
const usersController = new UsersControllerr();
const checkController = new CheckController();
const taskController = new TaskControler();
const notesController = new NotesController();

routes.use(express.json());

//user
routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.get('/uservalidate/:email/:password', usersController.validateUser);
//checkpoint
routes.get('/checkpoint/:userId', checkController.show);
//task
routes.get('/task', taskController.index);
routes.get('/task/:checkpointId', taskController.show);
//note
routes.get('/notes/:userId', notesController.show);

//checkpoint
routes.post('/checkpoint',
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
routes.post('/checkpoint/complete',
    celebrate({
        body: Joi.object().keys({
            idCheck: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), 
    checkController.complete);
routes.post('/checkpoint/update',
    celebrate({
        body: Joi.object().keys({
            idCheck: Joi.number().required(),
            summary: Joi.string().required(),
            description: Joi.string().required(),
            limitdate: Joi.string().required()
        })
    }, {
        abortEarly: false
    }), 
    checkController.update);
routes.post('/checkpoint/delete',
    celebrate({
        body: Joi.object().keys({
            idCheck: Joi.number().required()
        })
    }, {
        abortEarly:false
    }),
    checkController.delete);
//user
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
//task
routes.post('/tasks',
    celebrate({
        body: Joi.object().keys({
            idCheck: Joi.number().required(),
            summary: Joi.string().required(),
            description: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    taskController.create);
routes.post('/tasks/complete',
    celebrate({
        body: Joi.object().keys({
            idTask: Joi.number().required()
        })
    }, {
        abortEarly: false
    }),
    taskController.complete);
routes.post('/tasks/update',
    celebrate({
        body: Joi.object().keys({
            idTask: Joi.number().required(),
            summary: Joi.string().required(),
            description: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    taskController.update);
//note
routes.post('/notes',
    celebrate({
        body: Joi.object().keys({
            userId: Joi.number().required(),
            summaryNote: Joi.string().required(),
            descNote: Joi.string().required()
        })
    }, {
        abortEarly: false
    }), 
    notesController.create);
routes.post('/notes/drop',
    celebrate({
        body: Joi.object().keys({
            idNote: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), 
    notesController.drop);
routes.post('/notes/update',
    celebrate({
        body: Joi.object().keys({
            idNote: Joi.number().required(),
            descNote: Joi.string().required(),
            summaryNote: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    notesController.update);

export default routes;