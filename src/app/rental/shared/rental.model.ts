import { BookingModel} from './booking.model';

export class RentalModel{

  _id: string;
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt: string;
  booking: BookingModel


}
