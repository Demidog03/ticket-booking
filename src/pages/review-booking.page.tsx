import {useContext, useMemo} from "react";
import BookingContext from "../modules/booking/context/booking-context.tsx";
import {Typography} from "antd";
import classes from './page.module.scss'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import BookingTrainCard from "../modules/booking/ui/booking-train-card.tsx";
import BookingPassengerCard from "../modules/booking/ui/booking-passenger-card.tsx";

dayjs.extend(customParseFormat);

const { Title } = Typography;


function ReviewBookingPage() {
    const { bookingInfo } = useContext(BookingContext)

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

    return (
        <div className={classes.reviewBookingContainer}>
            <Title className={classes.title}>Review booking</Title>
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
            {Array(bookingInfo.passengers).fill(null).map((_, index) => (
                <BookingPassengerCard passengerIndex={index + 1}/>
            ))}
        </div>
    );
}

export default ReviewBookingPage;