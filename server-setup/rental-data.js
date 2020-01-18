const model=require('./models/models');
const userModel=require('./models/user-model');
const booking=require('./models/booking');
const fakeData= require('./fakeData/data')

class Rental_Data_to_db{

	constructor(){

		this.data= fakeData.rentals;
    this.user= fakeData.users;
	}

	data_to_mongoose_model(){
            const userM=new userModel(this.user[0]);
            const userM1=new userModel(this.user[1]);
            let count=0;
		this.data.forEach((rental_data)=>{
			            const rental_model=new model(rental_data);
                  rental_model.user = userM ;
                  userM.rental[count]=rental_data ;

			            rental_model.save();
                  count=count+1;
		})
            userM.save();
            userM1.save();

	}

	async add_rental_data_to_db(){
		await this.clean_Data_from_db();
		this.data_to_mongoose_model();
	}

	async clean_Data_from_db(){
            await userModel.deleteMany({});
		await model.deleteMany({});
    await booking.deleteMany({});

	}
}

module.exports= Rental_Data_to_db