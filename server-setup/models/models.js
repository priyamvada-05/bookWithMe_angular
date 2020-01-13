mongoose=require('mongoose');

const rentalSchema = new mongoose.Schema({
	title: { type: String, require: true, max:[128, 'exceeding the length. Limit is 128 character']},
	city: {type: String, require: true},
	street: {type: String, require: true},
	category: {type: String, require: true, max:[128, 'Limit is 128 character'], min:[1, 'Min limit is 1 character']},
	image:{type: String, require:true},
	bedrooms:{type:Number, require: true},
	description: {type: String, require: true, max:[128, 'Limit is 128 character'], min:[1, 'Min limit is 1 character']},
	dailyRate:Number,
	shared:Boolean,
	createdAt:{type:Date, default: Date.now},
	user:{type: mongoose.Schema.Types.ObjectID, ref: 'usermodel'},
	booking:[{ type: mongoose.Schema.Types.ObjectID, ref: 'bookingModel'}]
})

module.exports=mongoose.model('Rental', rentalSchema);