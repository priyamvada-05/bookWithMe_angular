const bcrypt=require('bcrypt');
var userModel=require('../models/user-model');
const jwt=require('jsonwebtoken');
const config=require('../config/dev-config');

exports.reg=function(req, res){
	const {username, email, password, passwordConfirmation}=req.body;
	console.log(req.body);
	if(!password || !email){
		console.log('I am in first if statemant');
		return res.status(422).send({
			error:{
				'title': 'Invalid entry',
				'status':422,
				'error': 'Please enter email and password'
			}
		})
	}

	if(password !== passwordConfirmation){
		return res.status(422).send({
			error:{
				title: 'Invalid password',
				status:422,
				error: 'Please check your password as its not same'
			}
		})
	}
	userModel.findOne({email}).then(
		(data)=>{
			if(data){
			return res.status(422).send({
				error:{
					title: 'Invalid user',
					status:422,
					error: 'This email is already registered'
				}
		})}
			else{
				const model=new userModel({username, email, password});
				model.save((err)=>{

					if(err){
						return res.status(422).send({
							error:{
								title:'email',
								status:422,
								error: err.errors.email.message
							}
						})
					}

					return res.json({
						"status":"success",
						"response":true
					})
					})
			}}).catch((err)=>{
			    console.log(err);
	})
		}

exports.auth=function(req, res){
	const { email, password } = req.body;

	if( !email || !password){
		return res.status(422).send({
			error:{
				'title': 'Invalid entry',
				'status':422,
				'error': 'Please enter email and password'
			}
		})
	}

	userModel.findOne({email}).then((data)=>{

		if(!data){
			return res.status(422).send({
				error:{
					'title': 'Invalid email',
					'status':422,
					'error': 'This email is not registered'
				}
			})
		}
		bcrypt.compare(password, data.password).then(function(match) {
         if(!match) {

			return res.status(422).send({
				error:{
					'title': 'Invalid password',
					'status':422,
					'error': 'Please  enter correct password'
				}
			})
		}

		else{
			const token=jwt.sign({
					  userID: data.id,
					  username:data.username
					}, config.secret, { expiresIn: '1h' });
			console.log('This is token send by server');
			console.log(token);
			console.log(typeof(token));
			return res.status(200).send({
				token:token
			});
		}
});

		

	}).catch((err) =>{
		console.log(err);
		return res.json(err);
	});
}

exports.authMiddlewareAuth=function(req, res, next){

	const token=req.headers.authorization;
	console.log(token);

	if(!token){
		return res.status(422).send({
			error:{
				'title': 'Invalid entry',
				'status':422,
				'error': 'Please enter email and password'
			}
		})
	}

	const pToken= jwt.verify(token.split(' ')[2], config.secret);
	console.log(pToken);


	userModel.findById(pToken.userID).then((data)=>{
		console.log('This is findByID');
		console.log(data)
		res.locals.user=data;
		next();
	}).catch((err)=>{
		return res.json(err);
	})
}





