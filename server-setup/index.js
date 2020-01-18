const express=require('express');
const mongoose = require('mongoose');
const config=require('./config');
const model=require('./models/models')
const rental=require('./rental-data');
const rental_routes=require('./routes/rental-routes');
const user_routes=require('./routes/auth-routes');
const booking_routes=require('./routes/booking-routes');
const path=require('path');

mongoose.connect(config.connection_string , {useNewUrlParser: true}).then(()=>{

	if(process.env.NODE_ENV !== 'production'){
	const rental_db=new rental();
	//rental_db.add_rental_data_to_db();

}
});


const app=express();
app.use(express.json());

app.use('/api/v1/application', rental_routes);
app.use('/api/v1/user', user_routes);
app.use('/api/v1/booking', booking_routes);

if(process.env.NODE_ENV !== 'production'){

	const appPath=path.join(__dirname, '..', 'dist/bwm-angular-cli');
	app.use(express.static(appPath));

	app.get('*', function(req, res){
		res.sendFile(path.resolve(appPath, 'index.html'));
});
}

app.listen(process.env.PORT || 3001, function(){
		console.log('Server is avaiable and listening to port');

});


