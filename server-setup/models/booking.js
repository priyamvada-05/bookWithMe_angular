const mongoose=require('mongoose');

const BookingSchema= new mongoose.Schema({

	endAt:{type:Date, required:'End date is required'},
	startAt:{type:Date, required:'Start date is required'},
	totalPrice:{ type:Number},
	day:{ type:Number},
	guest:{ type:Number},
	createdAt:{ type: Date, default:Date.now},
	user:{type: mongoose.Schema.Types.ObjectID, ref:'usermodel'},
	rental:{ type: mongoose.Schema.Types.ObjectID, ref:'Rental'}
})

module.exports=mongoose.model('bookingModel', BookingSchema);