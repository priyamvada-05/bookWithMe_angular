const model=require('./models/models');
const userModel=require('./models/user-model');
const booking=require('./models/booking');
class Rental_Data_to_db{

	constructor(){

		this.data=[{
                  title: "Nice view on ocean",
                  city: "san Francisco",
                  street: "Main street",
                  category: "condo",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 4,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 43
                  },
                  {
                  title: "Modern appartment in center",
                  city: "New York",
                  street: "Time Square",
                  category: "apartment",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 1,
                  shared: false,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 11
                  },
                  {
                  title: "Old house in nature",
                  city: "spisska nova ves",
                  street: "Banicka 1",
                  category: "house",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 5,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 23
				 }]

             this.user=[{
                      "username":"Testnew5",
                      "email":"Testnew5@gmail.com",
                      "password":"Testt"
                  },
                       {
                      "username":"Testnew05",
                      "email":"Testnew05@gmail.com",
                      "password":"Testt5"
                  }
                  ]    
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