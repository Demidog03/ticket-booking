import {Button, Card} from "antd";
import classes from './train-card.module.scss'
import type {TrainClass} from "../../../shared/constants/train-mock.data.ts";

interface TrainCardProps {
    title: string;
    departure: {
        date: string;
        time: string;
        station: string;
    }
    arrival: {
        date: string;
        time: string;
        station: string;
    }
    duration: string;
    ticketClasses: TrainClass[]
}

function classCodeToClassName(classCode: string) {
    switch (classCode) {
        case '3A': return 'third'
        case '2A': return 'second'
        case '1A': return 'first'
    }
}

function TrainCard({ title = 'No data', duration, departure, arrival, ticketClasses }: TrainCardProps) {
    return (
        <Card className={classes.trainCard} title={title} extra={<a href="#">More</a>}>
            <p>Runs on</p>
            <Button style={{ cursor: 'text' }} color="cyan" variant="outlined">
                Everyday
            </Button>
            <div className={classes.mainInfo}>
                <div className={classes.departureInfo}>
                    <p className={classes.date}>{departure.date}</p>
                    <p>{departure.time}</p>
                    <p>{departure.station}</p>
                </div>
                <p className={classes.duration}>{duration}</p>
                <div className={classes.arrivalInfo}>
                    <p className={classes.date}>{arrival.date}</p>
                    <p>{arrival.time}</p>
                    <p>{arrival.station}</p>
                </div>
            </div>
            <div className={classes.ticketClassesContainer}>
                {ticketClasses.map(ticketClass => (
                    <div className={classes['ticketClass'] + ' ' + classes[classCodeToClassName(ticketClass.classCode) || '']}>
                        <div>
                            <p>{ticketClass.classCode}</p>
                            <p>{ticketClass.fareType}</p>
                        </div>
                        <div className={classes.rightColumn}>
                            <p>{ticketClass.availability.type === 'available' ? `Avl - ${ticketClass.availability.count}` : `WL - ${ticketClass.availability.position}`}</p>
                            <p>₹{ticketClass.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default TrainCard;
