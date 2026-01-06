import {Card} from "antd";
import classes from './booking.module.scss'

interface BookingTrainCardProps {
    trainNumber: string;
    trainName: string;
    classCode: string;
    fareType: string;
    departureDate: string;
    departureTime: string;
    fromStation: string;
    arrivalDate: string;
    arrivalTime: string;
    toStation: string;
    duration: string;
}

function BookingTrainCard(props: BookingTrainCardProps) {
    return (
        <Card className={classes.trainCard}>
            <h2>Boarding Details</h2>
            <div className={classes.nameAndClass}>
                <h3>{props.trainNumber} - {props.trainName}</h3>
                <h4>Class {props.classCode} & {props.fareType} Quota</h4>
            </div>
            <div className={classes.mainInfo}>
                <div>
                    <p className={classes.date}>{props.departureDate}</p>
                    <p>{props.departureTime}</p>
                    <p>{props.fromStation}</p>
                </div>
                <p className={classes.hours}>{props.duration}</p>
                <div className={classes.arrival}>
                    <p className={classes.date}>{props.arrivalDate}</p>
                    <p>{props.arrivalTime}</p>
                    <p>{props.toStation}</p>
                </div>
            </div>
        </Card>
    );
}

export default BookingTrainCard;