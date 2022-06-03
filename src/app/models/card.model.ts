import { Movement } from "./movement.model";

export interface Card {
    _id: string;
    number: string;
    ownerId: string;
    owner: string;
    type: 'visa' | 'mastercard';
    amount: number;
    movements?: Movement[];
}

export interface CardForm {
    name: string;
    surname: string;
    type: 'visa' | 'mastercard';
    number: string;
    csc: number;
}