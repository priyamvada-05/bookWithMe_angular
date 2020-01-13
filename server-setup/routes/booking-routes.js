const express=require('express');
const authMiddleware=require('../controller/user_controller');
const bookingController=require('../controller/booking_controller');


const router=express.Router();

router.post('/booking', authMiddleware.authMiddlewareAuth, bookingController.bookingReq);

module.exports=router;