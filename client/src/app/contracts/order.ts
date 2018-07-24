import { Item } from './item';

export interface Order {
    id: string;
    offerId: string;
    dateCompleted: string;
    fflEmployee: string;
    purchases: [{ item: Item; quantity: number }];
    notes: string;
}
