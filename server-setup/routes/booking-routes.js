const express=require('express');
const authMiddleware=require('../controller/user_controller');
const bookingController=require('../controller/booking_controller');


const router=express.Router();

router.post('', authMiddleware.authMiddlewareAuth, bookingController.bookingReq);

router.get('/userBooking', authMiddleware.authMiddlewareAuth, bookingController.userBooking)

module.exports=router;