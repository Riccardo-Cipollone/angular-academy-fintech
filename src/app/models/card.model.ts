export interface Card {
    _id: string;
    number: string;
    ownerId: string;
    owner: string;
    type: 'visa' | 'mastercard';
    amount: number;
}

export interface CardForm {
    type: 'visa' | 'mastercard';
    name: string;
    surname: string;
    cardNumber: string;
    securityCode: number;
}