import {createContext, type Dispatch, type JSX, type SetStateAction, useEffect, useState} from "react";
import type {Train} from "../../../shared/constants/train-mock.data.ts";
import type {BookingPassengerFormData} from "../ui/booking-passenger-card.tsx";
import {type BookingFood, bookingFoods} from "../data/booking-mock-data.ts";

export interface BookingFoodData extends BookingFood {
    isAdded: boolean;
}

export interface BookingInfo {
    tripVariant: string | undefined;
    departure: string | undefined
    arrival: string | undefined;
    date: string | string[] | undefined;
    passengers: number | undefined;
    selectedTrain?: Train | undefined;
    selectedClassCode?: string | undefined;
    passengersData?: BookingPassengerFormData[]
    foodData?: BookingFoodData[]
}

const initialValue = {
    tripVariant: undefined,
    departure: undefined,
    arrival: undefined,
    date: undefined,
    passengers: undefined,
    selectedTrain: undefined,
    selectedClassCode: undefined,
    passengersData: undefined,
    foodData: bookingFoods.map(food => ({...food, isAdded: false}))
}

export interface BookingContextInterface {
    bookingInfo: BookingInfo;
    setBookingInfo:  Dispatch<SetStateAction<BookingInfo>>;
}

const BookingContext = createContext<BookingContextInterface>({
    bookingInfo: initialValue,
    setBookingInfo: () => {}
});

export const BookingProvider = ({ children }: { children: JSX.Element }) => {
    const localstorageBookingInfo = JSON.parse(localStorage.getItem('bookingInfo') ?? '{}') as BookingInfo;
    const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
        ...initialValue,
        ...localstorageBookingInfo,
    });

    useEffect(() => {
        localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo))
    }, [bookingInfo])

    return (
        <BookingContext value={{bookingInfo, setBookingInfo}}>
            {children}
        </BookingContext>
    )
}

export default BookingContext;

