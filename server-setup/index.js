const express=require('express');
const mongoose = require('mongoose');
const config=require('./config/dev-config');
const model=require('./models/models')
const rental=require('./rental-data');
const rental_routes=require('./routes/rental-routes');
const user_routes=require('./routes/auth-routes');
const booking_routes=require('./routes/booking-routes');

mongoose.connect(config.connection_string , {useNewUrlParser: true}).then(()=>{
	const rental_db=new rental();
	rental_db.add_rental_data_to_db();
})


const app=express();
app.use(express.json());

app.use('/api/v1/application', rental_routes);
app.use('/api/v1/user', user_routes);
app.use('/api/v1/booking', booking_routes)

app.listen(3001, function(){
		console.log('Server is avaiable and listening to port');

});


