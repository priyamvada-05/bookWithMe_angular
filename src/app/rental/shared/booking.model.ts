import { RentalModel} from './rental.model';

export class BookingModel {

	_id:string;
	startAt: string;
	endAt: string;
	totalPrice: number;
	days: number;
	createdAt: number;
	rental: RentalModel;
	guest: number;
}