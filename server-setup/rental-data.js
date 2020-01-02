const model=require('./models/models');
class Rental_Data_to_db{

	constructor(){

		this.data=[{
                  title: "Nice view on ocean",
                  city: "San Francisco",
                  street: "Main street",
                  category: "condo",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 4,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 43
                  },
                  {
                  title: "Modern apartment in center",
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
                  city: "Spisska Nova Ves",
                  street: "Banicka 1",
                  category: "house",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 5,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 23
				 }]
	}

	data_to_mongoose_model(){
		this.data.forEach((rental_data)=>{
			const rental_model=new model(rental_data);
			rental_model.save();
		})

	}

	add_rental_data_to_db(){
		this.clean_Data_from_db();
		this.data_to_mongoose_model();
	}

	async clean_Data_from_db(){
		await model.deleteMany({});
	}
}

module.exports= Rental_Data_to_db