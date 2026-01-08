import {useContext, useEffect, useMemo, useRef} from "react";
import BookingContext from "../modules/booking/context/booking-context.tsx";
import {Button, Card, Flex, Typography} from "antd";
import classes from './page.module.scss'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import BookingTrainCard from "../modules/booking/ui/booking-train-card.tsx";
import BookingPassengerCard, {
    type BookingPassengerCardRef,
    type BookingPassengerFormData
} from "../modules/booking/ui/booking-passenger-card.tsx";
import BookingFoodCard from "../modules/booking/ui/booking-food-card.tsx";

dayjs.extend(customParseFormat);

const { Title } = Typography;

function ReviewBookingPage() {
    const { bookingInfo, setBookingInfo } = useContext(BookingContext)
    const foodData = bookingInfo.foodData
    const passengerFormRefs = useRef<(BookingPassengerCardRef | null)[]>([]);

    const selectedClass = useMemo(() => {
        return bookingInfo.selectedTrain?.classes.find(t => t.classCode === bookingInfo.selectedClassCode)
    }, [bookingInfo.selectedTrain, bookingInfo.selectedClassCode])

    const { departureDate, departureTime, arrivalDate, arrivalTime } = useMemo(() => {
        if (!bookingInfo.selectedTrain) return {};

        const bookingDate = dayjs(bookingInfo?.date?.[0]);
        const depTime = bookingInfo.selectedTrain.from.time; // "06:00"
        const arrTime = bookingInfo.selectedTrain.to.time; // "22:30"

        // Combine date with time
        const departureDateTime = dayjs(
            `${bookingDate.format('YYYY-MM-DD')} ${depTime}`,
            'YYYY-MM-DD HH:mm'
        );

        const arrivalDateTime = dayjs(
            `${bookingDate.format('YYYY-MM-DD')} ${arrTime}`,
            'YYYY-MM-DD HH:mm'
        );

        return {
            departureDate: departureDateTime.format('MMM DD'),
            departureTime: departureDateTime.format('h:mm a'),
            arrivalDate: arrivalDateTime.format('MMM DD'),
            arrivalTime: arrivalDateTime.format('h:mm a')
        };
    }, [bookingInfo.date, bookingInfo.selectedTrain]);

    async function handleSubmit() {
        try {
            setBookingInfo(prev => ({
                ...prev,
                passengersData: undefined
            }))

            let hasErrors = false
            const passengersData: BookingPassengerFormData[] = []

            for (const ref of passengerFormRefs.current) {
                const data = await ref?.validate()

                if (data) {
                    passengersData.push(data)
                } else {
                    hasErrors = true
                }
            }

            if (hasErrors) {
                alert('Please fill all passengers data')
                return
            }

            setBookingInfo(prev => ({
                ...prev,
                passengersData: passengersData
            }))
        }
        catch { /* empty */ }
    }

    function addFoodToTicket(foodId: string) {
        const changedFood = foodData?.find(f => f.id === foodId)
        if (changedFood && foodData) {
            changedFood.isAdded = true

            setBookingInfo({
                ...bookingInfo,
                foodData: [...foodData]
            })
        }
    }

    function removeFoodFromTicket(foodId: string) {
        const changedFood = foodData?.find(f => f.id === foodId)
        if (changedFood && foodData) {
            changedFood.isAdded = false

            setBookingInfo({
                ...bookingInfo,
                foodData: [...foodData]
            })
        }
    }

    useEffect(() => {
        console.log(bookingInfo)
    }, [bookingInfo])

    return (
        <div className={classes.reviewBookingContainer}>
            <Title className={classes.title}>Review booking</Title>
            <div style={{ marginBottom: 24 }}>
                <BookingTrainCard
                    trainName={bookingInfo.selectedTrain?.trainName || ''}
                    trainNumber={bookingInfo.selectedTrain?.trainNumber || ''}
                    classCode={selectedClass?.classCode || ''}
                    fareType={selectedClass?.fareType || ''}
                    departureDate={departureDate || ''}
                    departureTime={departureTime || ''}
                    fromStation={bookingInfo.selectedTrain?.from.station || ''}
                    toStation={bookingInfo.selectedTrain?.to.station || ''}
                    arrivalDate={arrivalDate || ''}
                    arrivalTime={arrivalTime || ''}
                    duration={bookingInfo.selectedTrain?.duration || ''}
                />
            </div>
            <Flex vertical gap={16}>
                {Array(bookingInfo.passengers).fill(null).map((_, index) => (
                    <BookingPassengerCard
                        key={index}
                        ref={(card) => {
                            passengerFormRefs.current[index] = card
                        }}
                        passengerIndex={index + 1}
                    />
                ))}
            </Flex>
            <div className={classes.foodsContainer}>
                {foodData?.map((food, index) => (
                    <BookingFoodCard
                        key={index}
                        image={food.image}
                        name={food.name}
                        price={food.price}
                        isAdded={food.isAdded}
                        addToTicket={() => addFoodToTicket(food.id)}
                        removeFromTicket={() => removeFoodFromTicket(food.id)}
                    />
                ))}

            </div>
            <Flex vertical gap={16} wrap style={{ marginTop: 48 }}>
                <Button block color="primary" variant="solid" size="large" onClick={handleSubmit}>Book now</Button>
            </Flex>
        </div>
    );
}

export default ReviewBookingPage;