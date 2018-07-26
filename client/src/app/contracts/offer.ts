import { Item } from './item';
import { Order } from './order';

export interface Offer {
    id: string;
    farmId: string;
    date: Date;
    availabilities: [{ item: Item; quantity: number }];
    farmerNotes?: string;
}
