const express=require('express');
const routes=express.Router();
const userController=require('../controller/user_controller');

routes.post('/login', userController.auth);

routes.post('/register', userController.reg);

module.exports=routes;