const bcrypt=require('bcrypt');
const mongoose=require('mongoose');


var UserModelSchema= new mongoose.Schema({

	username:{
		type:String, 
		require:true, 
		min:[5,'Minimum 5 character'],
		max:[10, 'maximum 10 character']

	},

	password:{
		type:String, 
		require:true, 
		min:[5,'Minimum 5 character'], 
		max:[10, 'maximum 10 character']

	},

	passwordConfirmation:{
		type:String, 
		require:true, 
		min:[5,'Minimum 5 character'], 
		max:[10, 'maximum 10 character']

	},
	
	email: {
		type: String, 
		require: true,
		unique:true,
		match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
		lowercase:true
	},

	rental: [{type: mongoose.Schema.Types.ObjectID, ref: 'rentals'}]
	

})

/*UserModelSchema.method.matchPassword(user, Userpassword){


}*/

UserModelSchema.pre('save', function(next){
	const user=this;
	console.log(user)
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
    	console.log(hash);
    	console.log(typeof(hash));
        user.password=hash;
        next();
    });
});
}); 

module.exports=mongoose.model('usermodel', UserModelSchema);