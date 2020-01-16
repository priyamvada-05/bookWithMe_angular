const rentalModel=require('../models/models');
const bookingModel=require('../models/booking');
const userModel= require('../models/user-model');
const moment=require('moment');

exports.bookingReq=function(req, res){


	const {startAt, endAt, days, totalPrice, guest}= req.body;
	const book={ startAt, endAt };
	const rental1=req.body.rental;
	const user=res.locals.user;

	console.log('request body');
	console.log(req.body);

	console.log('user');
	console.log(user);
	
	rentalModel.findById(rental1._id).populate('booking').populate('user').exec().then((rental)=>{

		console.log('This is the data');
		console.log(rental);

		if(rental.user._id === user._id){
			return res.status(422).send({
				error:{
					title:'Invalid request',
					status:422,
					error:'Cannot book your own rental'
				}
			});
		}


		if(isBookingValid(book, rental)){

			const bookRental=new bookingModel({ startAt, endAt, days, totalPrice,  guest, rental });
			bookRental.user=rental.user;

			rental.booking.push(bookRental);
			rental.save();

			userModel.findOneAndUpdate({_id: user._id},
				{$push:{ booking: bookRental}
			} ).then((data)=>{
				console.log('Data is saved')
				console.log(data);
			}).catch((err)=>{
				console.log(err);
			})

			bookRental.save().then((rental)=>{


			return res.status(200).send({
				startAt: bookRental.startAt,
				endAt: bookRental.endAt
			});
			}).catch((err)=>{

				console.log(err);
			})


		}

		else
		return res.status(422).send({
			error:{
					title:'Invalid request',
					status:422,
					error:'Booking not available'
				}
		});



	}).catch((err)=>{
		console.log('this is error');
		console.log(err);
	})
}

function isBookingValid(proposedBooking, rental){

	let validBooking=true;

	if(rental.booking && rental.booking.length > 0){

	 validBooking=rental.booking.every((data)=>{
		const proposedStart= moment(proposedBooking.startAt);
		const proposedEnd= moment(proposedBooking.endAt);
		const actualStart= moment(data.startAt);
		const actualEnd= moment(data.endAt);



		if((actualStart > proposedStart && actualStart > proposedEnd) || 
			(actualEnd< proposedStart && actualEnd < proposedEnd)){
			return true;
		}
		else{
		return false;
     	}
     });
}

	 return validBooking;


	/*const proposedStart= moment(proposedBooking.startAt);
	const proposedEnd= moment(proposedBooking.endAt);

	rentalModel.find({ "booking":{ 
							$elemMatch:{

							"$or" : [{ "startAt": {"$gt": proposedStart, "$gt": proposedEnd}},
									{ "endAt":    {"$lt": proposedStart, "$lt": proposedEnd}}
									]
								}
								}
					}).then((data)=>{
						console.log('This is query data');
						console.log(data)
					}).catch((err)=>{
						console.log('this is query error');
						console.log(err);
					})

return false;*/
}
