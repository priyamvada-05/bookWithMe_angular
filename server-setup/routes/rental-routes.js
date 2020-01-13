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