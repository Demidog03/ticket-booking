import {Button, Card} from "antd";
import classes from './booking.module.scss'

interface BookingFoodCardProps {
    image: string
    name: string
    price: number
    isAdded: boolean
    addToTicket?: () => void
    removeFromTicket?: () => void
}

function BookingFoodCard({ image, name, price, isAdded, addToTicket, removeFromTicket }: BookingFoodCardProps) {
    return (
        <Card
            actions={[
                !isAdded ?
                    <Button onClick={addToTicket} color="green" variant="filled" block>Add to Ticket</Button>
                    :
                    <Button onClick={removeFromTicket} block color="orange" variant="filled">Remove</Button>
            ]}
            className={classes.foodCard}
            classNames={{ body: classes.foodCardBody, actions: classes.foodCardActions }}
            cover={
                <img
                    draggable={false}
                    alt="example"
                    src={image}
                />
            }
        >
            <h2>
                {name}
            </h2>
            <h3>₹{price.toFixed(2)}</h3>
        </Card>
    );
}

export default BookingFoodCard;