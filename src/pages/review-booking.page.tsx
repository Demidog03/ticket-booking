import {type ChangeEvent, useContext, useEffect, useMemo, useRef, useState} from "react";
import BookingContext from "../modules/booking/context/booking-context.tsx";
import {Button, Card, Flex, Input, Typography} from "antd";
import classes from './page.module.scss'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import BookingTrainCard from "../modules/booking/ui/booking-train-card.tsx";
import BookingPassengerCard, {
    type BookingPassengerCardRef,
    type BookingPassengerFormData
} from "../modules/booking/ui/booking-passenger-card.tsx";
import BookingFoodCard from "../modules/booking/ui/booking-food-card.tsx";
import {TagsFilled} from "@ant-design/icons";

dayjs.extend(customParseFormat);

const { Title } = Typography;

function ReviewBookingPage() {
    const { bookingInfo, setBookingInfo, addExtraBaggage, removeExtraBaggage, changePromocode } = useContext(BookingContext)
    const foodData = bookingInfo.foodData
    const passengerFormRefs = useRef<(BookingPassengerCardRef | null)[]>([]);
    const [promocode, setPromocode] = useState<string>('')
    const timerRef = useRef<number | null>(null)

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

    function handleChangePromocode(e: ChangeEvent<HTMLInputElement>) {
        const promocode = e.target.value;
        setPromocode(promocode)
    }

    function applyPromocode(code: string) {
        setPromocode(code)
    }

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            changePromocode(promocode)
        }, 300)
    }, [promocode])

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
            <Flex vertical gap={16} style={{ marginBottom: 24 }}>
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

            <Card className={classes.offersCard}>
                <h2>Offers</h2>
                <Flex gap={16} justify="space-between" align="center" className={classes.offer1}>
                    <p><TagsFilled className={classes.icon} /> 50% off up to ₹1000 | Use code BOOKNOW</p> <Button onClick={() => applyPromocode('BOOKNOW')} color="magenta" size="small" variant="link">Apply</Button>
                </Flex>
                <Flex gap={16} justify="space-between" align="center">
                    <p><TagsFilled className={classes.icon} /> 20% off | Use code FIRSTTIME</p> <Button onClick={() => applyPromocode('FIRSTTIME')} color="magenta" size="small" variant="link">Apply</Button>
                </Flex>
            </Card>

            <Flex gap={32} style={{ marginBottom: 24 }}>
                <Card className={classes.promocodeCard}>
                    <h2>Apply Code</h2>
                    <Input value={promocode} onChange={handleChangePromocode} size="large" placeholder="Enter code" variant="underlined" />
                </Card>
                <Card className={classes.extraBaggageCard}>
                    <h2>Extra Baggage</h2>
                    {!bookingInfo.hasExtraBaggage
                        ? <Button onClick={addExtraBaggage} color="green" variant="filled" block>Add to Ticket</Button>
                        : <Button onClick={removeExtraBaggage} color="orange" variant="filled" block>Remove</Button>
                    }
                </Card>
            </Flex>

            <Card className={classes.billDetailsCard}>
                <h2>Bill details</h2>
                <div style={{ marginBottom: 16 }}>
                    <Flex justify="space-between" align="center"><span>Base Ticket Fare</span> <span>₹{bookingInfo.billDetails.baseTicketFare}</span></Flex>
                    {bookingInfo.billDetails.foodCharges?.map(f => (
                        <Flex justify="space-between" align="center"><span>{f.name}</span> <span>₹{f.price}</span></Flex>
                    ))}
                    {bookingInfo.hasExtraBaggage && <Flex justify="space-between" align="center"><span>Extra Baggage</span> <span>₹{bookingInfo.billDetails.extraBaggage}</span></Flex>}
                    <Flex justify="space-between" align="center"><span>CGST & SGST</span> <span>₹{bookingInfo.billDetails.cgst}</span></Flex>
                    {bookingInfo.billDetails.discount && <Flex justify="space-between" align="center"><span>Discount</span> <span className={classes.discount}>- ₹{bookingInfo.billDetails.discount}</span></Flex>}
                </div>

                <Flex className={classes.totalCharge} justify="space-between" align="center">
                    <span>Total Charge</span>
                    <span>₹{bookingInfo.billDetails.totalAmountWithDiscount}</span>
                </Flex>
            </Card>

            <Flex vertical gap={16} wrap style={{ marginTop: 48 }}>
                <Button block color="primary" variant="solid" size="large" onClick={handleSubmit}>Book now</Button>
            </Flex>
        </div>
    );
}

export default ReviewBookingPage;