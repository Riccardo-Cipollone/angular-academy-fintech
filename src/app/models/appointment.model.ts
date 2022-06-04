export interface Location {
    _id: string;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    coords: [number, number]
}

export interface DayWithSlots {
    day: string;
    slots: SlotNumber[];
}

export interface DayWithSlot {
    day: string;
    slot: SlotNumber;
}

export type SlotNumber = {
    slot: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
}