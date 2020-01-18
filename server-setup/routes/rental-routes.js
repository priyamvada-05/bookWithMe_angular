const express=require('express');
const routes=express.Router();
const model=require('../models/models');
const UserCtrl=require('../controller/user_controller');

routes.get('/secret', UserCtrl.authMiddlewareAuth ,function(req, res){
	console.log(req.body);
	res.json({
		'access':'you can access this page'
	});
})

routes.get('', function(req, res){

	
	const city=req.query.city;
	console.log(city)
	//const city1=`/^${city.toLowerCase()}/`;
	if(city){
		console.log('This is inside the re.query.city');
		model.find({city: city}).select('-booking').exec().then((rental)=>{
			if(rental.length>0){
				return res.status(200).send(rental);
			}
			else
			{
				return res.status(422).send({
							title: 'Error occured',
							status: 422,
							error:`Could not find the rental with cith ${city}`
						});
		}
		
		}).catch((err)=>{
			console.log(err)
		})
	}

	else{

	model.find({}).select('-boooking').exec().then((rental)=>{

		return res.json(rental);

	}).catch((err)=>{
		console.log(err);
		return	res.status(422).send({
				title: 'Error occured',
				status: 422,
				error:'Could not find the data'
			} );
	});

	}



	
});

routes.get('/:rentalID', (req,res)=>{

	model.findById(req.params.rentalID)
		 .populate('user', 'username -_id')
		 .populate('booking', 'startAt endAt -_id').then((data)=>{

		 	console.log(data);
		 	return res.json(data);

		 }).catch((err)=>{
		 	console.log(err);
			return res.status(422).send({
				title: 'Error occured',
				status: 422,
				error:'Could not find the data'

			});
		 })


});


module.exports=routes;