import express from 'express';
import multer from 'multer'; // Lib de upload de imagem
import multerConfig from './config/multer'; // Config de upload de imagem
import { celebrate, Joi } from 'celebrate'; // Validacao de dados 

import UsersControllerr from './controllers/UsersController';
import CheckController from './controllers/CheckController';
import TaskControler from './controllers/TasksController';
import NotesController from './controllers/NotesController';
import FriendsController from './controllers/FriendsController';
import ActivityController from './controllers/ActivityController';

const routes = express.Router();
const upload = multer(multerConfig);
const usersController = new UsersControllerr();
const checkController = new CheckController();
const taskController = new TaskControler();
const notesController = new NotesController();
const friendsController = new FriendsController();
const activityController = new ActivityController();

routes.use(express.json());

//user
routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.get('/users/byname/:name/:myId', usersController.showByName);
routes.get('/users/bycod/:cod', usersController.showByCod);
routes.get('/uservalidate/:email/:password', usersController.validateUser);
routes.get('/usersingout/:email/:password', usersController.logoff);
//checkpoint
routes.get('/checkpoint/:userId', checkController.show);
//task
routes.get('/task', taskController.index);
routes.get('/task/:checkpointId', taskController.show);
//note
routes.get('/notes/:userId', notesController.show);
//friend
routes.get('/friends', friendsController.index);
routes.get('/friends/:userId', friendsController.show);
routes.get('/friends/verify/:userId/:friendId', friendsController.checkFriend);
routes.get('/friends/requests/:userId', friendsController.friendRequests);
routes.get('/friends/request/:userId/:friendId', friendsController.findFriendRequest);
//activity
routes.get('/activity', activityController.index);
routes.get('/activity/:userId', activityController.getFriendsActivity);
routes.get('/activity/getByUser/:userId', activityController.getUserActivity);

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
    upload.single('image'),
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
routes.put('/users/update',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null, ''),
            password: Joi.string().allow(null, '')
        })
    }, {
        abortEarly: false
    }), 
    usersController.update);
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
//friends
routes.post('/friends/add', // Manda solicitação
    celebrate({
        body: Joi.object().keys({
            userId: Joi.number().required(),
            friendId: Joi.number().required()
        })
    }, {
        abortEarly: false
    }),
    friendsController.addFriend);
routes.post('/friends/cancelRequest', // Cancela solicitação
    celebrate({
        body: Joi.object().keys({
            userId: Joi.number().required(),
            friendId: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), friendsController.cancelRequest);
routes.post('/friends/declineRequest', // Nega solicitação
    celebrate({
        body: Joi.object().keys({
            userId: Joi.number().required(),
            friendId: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), friendsController.declineRequest);
routes.post('/friends/acceptRequest', // Aceita solicitação
    celebrate({
        body: Joi.object().keys({
            userId: Joi.number().required(),
            friendId: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), friendsController.acceptRequest);
routes.post('/friends/endFriendship', // Aceita solicitação
    celebrate({
        body: Joi.object().keys({
            userId: Joi.number().required(),
            friendId: Joi.number().required()
        })
    }, {
        abortEarly: false
    }), friendsController.endFriendship);

export default routes;
//                     ..,,/#&@@@@@@&%##%%%%&&&@@@@@#//*.            ..  .........
//                  .,*/(%&%%(***,,,,***********///%&%&#(,,.       ...............
//                .,(%%(*,,,,,,,,,,,,,,,,*************//#%&#*....   .. ...........
//             .,/%(,,,,,,,,,,,,,,,,,,,,,,*****************/%&&*..  ..............
//            .(*,,,,,,,,,,,,,,,,,,,,,,,,,*******************//#&%,. .............
//         .,/**,,*,,,,,,,,,,,,,,,,,,,,,,,,,,***************//////&#. ............
//        *#,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,**********/*//////&%*...........
//      .(/**,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,***********/******/////(&%*.........
//     *%**,***,,,,,*,,,,,,,,,*,,,,,,,,,,,,,,**,,****************////((%&(........
//    *#*****/((((#(////*/**********,***************////(((((((((//(((((%&(.......
//   ,#/**%&&&&&@@@@@@@&%####((//*///////////////(#%%%&@@@@@@@@@@@&&&%#((%&(......
//   //*%%%%%%&@@@@@@@@@@@@&%%%#((//////((/((((#%%@@@@@@@@@@@@@@@@@@@@@&((%&......
//  .(/(////(((%&&@@@@@@@@@&&%%%##(((////((((#%%&@@@@@@@@@@@@@@@@@&%%%%%%#(&......
//   (*//(((%&&&&&&@@@@@@@@@&&&%%##((////((##%&@@@@@@@@@@@@@@@@@@@@@&&%###(%,.....
//   //(##%&&&#((///((#%&@@@@@@&%%#(/***///(#&@@@@@@@@@@@@@@&%%%%@@@@@&&%%##,.....
//   *(##%%#(%#(((//(#%&&&&@@@@&%#(//*,,,*/(#&@@@@@@@@@@%%#(###%%%%&&@@&&%##(.....
//   *(###%##%@@@@@@@@@@@@&&%%%%##(/**,***//(%@@@@@@&@@@@@@@@@@@@@@&&&&&@&%#(.....
//  *//(#%&@@@&%#@@@@@@@&@@@&##((/*********//#%&&&&@@@&#%@@@@@@@@@@@@@@&%%##(.....
// .***//(((##%%%%%%%%%&&%%#(((//***,,,,***/((###%%%%%%%&&&&&&&@@@@@&%###((((.....
// .*****///((######((/(/////////*********///((###(((((#((((((##((###(((((((((....
//.,*****************/******///****,,*****///(((###((//////(((/////////////((((/&.
//./***************,*******///*****,,,,,****///((###(/////***/**//////////((((%@%.
//.************,,,,,,*,****//****,,,,.,****//////(#%(/////*******/*/////((((###&..
// *//*******,,*,,,*******//***//**//**///((((((#####(///*/******/////(((((###%%  
// .///*****************/////((#%##((((###&&@&&&%%%%%#(/////*//////(//((((####%#  
//  ////***************/*//(#%&@@@&&&&&&@@@@@@@@@&&&&#((//////////////((((###%%#  
//  (////***********////////#&@@@@@#@@@@@@@@@@@@@@@@&%((///////////((((((####%#%  
//  .///////****************//##%##%&@@@%&@@@@@@@&&&%((////////////(((((####%&#%  
//   (//////****************/((#%###%%##(##%&&%#(((((///////////(/(((((#####%@@&% 
//   #////*/*****/**//////(((#&%%((((((((((#%&&&%%######((((((((((((((##(##%%@@#%%
//    (////**///*/###(###%%%%###(/**/*****//#%%&%%&&&@@&&%%%#####(((((#(##%%&@@@(&
//    %(///*/*///#%&%&&&%%&&%(%%&&&&&%%&&&&&&@@&&%%@@@@@@&&@@&&%##(#######%%@&&&& 
//    .#(///////(%&@@@@@&%%@@@@@@&&&&&@@@@@@@@@@@@@@@@@@@@@@@@@&#(######%%%&      
//     %((///////#&%&@@@@@@##((((((((#((((((####%%&&@@@@&%%&&&%%######%%%%&       
//      %((((////((###(((((###((((((((((((##%%%%%%%%###(((######%%%%%%%%%%        
//       ##(((/(//((((////(((((((((#(#########%%%%%##########%%%%%%%%&&&&         
//         ##(((((((((///(((#(##%%&@@@@@@@@&&&&&%%%%##%%%%%%%%%%%&%%&&&           
//           ##((((((((((((((###%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&/           
//             #####(((((((#(#################%#######%#%%%%#%%%&&&&&&,           
//             /(####((((((((((((((////////(((((((((#####%#%%%&&&&&&&%.           
//        ,****///####(((////////////////////((((((#####%%%&&&@@&&&&&%#           
//,,,,,,,,,,,**/////#%%#((((/////////////////((######%%%%&&@@@&&&&&&&%%           
//,,,,,,,,,,***//////##%%%%###((((((((((((######%%%%%&&@&@@&&@&&&&&&%%%&,         
//,,,,,,,,,****////////###%%%%%%%%%%#%%#%%%%&&&&&&@@@@@&@@@&&&&&&&&%&%%%%%%%      ℌ𝔦𝔞𝔤𝔬 ℑ.
