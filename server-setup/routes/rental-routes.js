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

	model.find({}, (err, data)=>{
		if(err){
			res.status(422).send({
				title: 'Error occured',
				status: 422,
				error:'Could not find the data'
			} );
		}
		console.log(err);
		res.json(data);
	});
	
});

routes.get('/:rentalID', (req,res)=>{
	model.findById(req.params.rentalID, (err, data)=>{
		if(err){
			res.status(422).send({
				title: 'Error occured',
				status: 422,
				error:'Could not find the data'

			});
		}
		console.log(err);
		res.json(data)
	});

})


module.exports=routes;