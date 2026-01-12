import {createContext, type Dispatch, type JSX, type SetStateAction, useCallback, useEffect, useState} from "react";
import type {Train} from "../../../shared/constants/train-mock.data.ts";
import type {BookingPassengerFormData} from "../ui/booking-passenger-card.tsx";
import {type BookingFood, bookingFoods} from "../data/booking-mock-data.ts";

export interface BookingFoodData extends BookingFood {
    isAdded: boolean;
}

export interface BillDetails {
    baseTicketFare: number | null;
    foodCharges: BookingFood[] | null;
    extraBaggage: number | null;
    cgst: number;
    discount: number | null;
    totalAmount: number | null;
    totalAmountWithDiscount: number | null;
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
    hasExtraBaggage: boolean
    promocode?: string
    billDetails: BillDetails
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
    foodData: bookingFoods.map(food => ({...food, isAdded: false})),
    hasExtraBaggage: false,
    promocode: '',
    billDetails: {
        baseTicketFare: null,
        foodCharges: null,
        extraBaggage: null,
        cgst: 500,
        discount: null,
        totalAmount: null,
        totalAmountWithDiscount: null
    }
}

export interface BookingContextInterface {
    bookingInfo: BookingInfo;
    setBookingInfo:  Dispatch<SetStateAction<BookingInfo>>;
    addExtraBaggage: () => void;
    removeExtraBaggage: () => void;
    changePromocode: (promocode: string) => void;
}

const BookingContext = createContext<BookingContextInterface>({
    bookingInfo: initialValue,
    setBookingInfo: () => {},
    addExtraBaggage: () => {},
    removeExtraBaggage: () => {},
    changePromocode: () => {}
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

    const addExtraBaggage = useCallback(() => {
        setBookingInfo(prev => ({...prev, hasExtraBaggage: true}))
    }, [setBookingInfo])

    const removeExtraBaggage = useCallback(() => {
        setBookingInfo(prev => ({...prev, hasExtraBaggage: false}))
    }, [setBookingInfo])

    const changePromocode = useCallback((promocode: string) => {
        setBookingInfo(prev => ({...prev, promocode}))
    }, [setBookingInfo])

    useEffect(() => {
        if (bookingInfo.selectedClassCode === '1A') {
            setBookingInfo(prev => ({...prev, billDetails: {...prev.billDetails, baseTicketFare: 800}}))
        }
        else if (bookingInfo.selectedClassCode === '2A') {
            setBookingInfo(prev => ({...prev, billDetails: {...prev.billDetails, baseTicketFare: 1000}}))
        }
        else if (bookingInfo.selectedClassCode === '3A') {
            setBookingInfo(prev => ({...prev, billDetails: {...prev.billDetails, baseTicketFare: 1200}}))
        }
    }, [bookingInfo.selectedClassCode])

    useEffect(() => {
        const selectedFood = bookingInfo.foodData?.filter(f => f.isAdded)
        const hasFood = selectedFood && selectedFood.length > 0

        setBookingInfo(prev => ({...prev, billDetails: {...prev.billDetails, foodCharges: hasFood ? selectedFood : null}}))
    }, [bookingInfo.foodData])

    useEffect(() => {
        setBookingInfo(prev => ({
            ...prev,
            billDetails: {
            ...prev.billDetails,
                extraBaggage: bookingInfo.hasExtraBaggage ? 500 : null
            }
        }))
    }, [bookingInfo.hasExtraBaggage])

    useEffect(() => {
        const foodCharges = bookingInfo.billDetails.foodCharges?.reduce((acc, current) => (acc + current.price), 0) || 0
        const extraBaggage = bookingInfo.billDetails.extraBaggage ?? 0
        const baseTicketFare = bookingInfo.billDetails.baseTicketFare ?? 0
        const cgst = bookingInfo.billDetails.cgst ?? 0
        const passengers = bookingInfo.passengers ?? 0

        setBookingInfo(prev => ({
            ...prev,
            billDetails: {
                ...prev.billDetails,
                totalAmount: (baseTicketFare + foodCharges + extraBaggage + cgst) * passengers
            }
        }))
    }, [bookingInfo.billDetails.foodCharges, bookingInfo.billDetails.extraBaggage, bookingInfo.billDetails.baseTicketFare, bookingInfo.billDetails.cgst, bookingInfo.passengers])

    useEffect(() => {
        let discount = null
        const totalAmount = bookingInfo.billDetails.totalAmount
        if (bookingInfo.promocode === 'BOOKNOW' && totalAmount) {
            discount = totalAmount / 2 > 1000 ? 1000 : totalAmount / 2
        }
        else if (bookingInfo.promocode === 'FIRSTTIME' && totalAmount) {
            discount = totalAmount * 0.2
        }

        setBookingInfo(prev => ({...prev, billDetails: {...prev.billDetails, discount}}))
    }, [bookingInfo.billDetails.totalAmount, bookingInfo.promocode])

    useEffect(() => {
        const discount = bookingInfo.billDetails.discount ?? 0
        const totalAmount = bookingInfo.billDetails.totalAmount ?? 0
        setBookingInfo(prev => ({...prev, billDetails: {...prev.billDetails, totalAmountWithDiscount: totalAmount - discount}}))
    }, [bookingInfo.billDetails.discount, bookingInfo.billDetails.totalAmount])

    return (
        <BookingContext value={{bookingInfo, setBookingInfo, addExtraBaggage, removeExtraBaggage, changePromocode}}>
            {children}
        </BookingContext>
    )
}

export default BookingContext;

