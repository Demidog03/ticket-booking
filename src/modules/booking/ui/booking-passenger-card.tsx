import {Card, DatePicker, Form, Input} from "antd";
import classes from './booking.module.scss'

type FieldType = {
    fullname?: string;
    phoneNumber?: string;
    email?: string;
    dateOfBirth?: string;
};

function BookingPassengerCard({ passengerIndex }: { passengerIndex: number; }) {
    function onFinish() {

    }

    return (
        <Card className={classes.passengerFormCard}>
            <h2>Passenger {passengerIndex}</h2>
            <h3>Please enter your contact info</h3>

            <Form
                name="passenger-info-form"
                layout="vertical"
                initialValues={{remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className={classes.formContainer}>
                    <Form.Item<FieldType>
                        label="Full Name"
                        name="fullname"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                    >
                        <Input size="large" variant="filled" placeholder="Your name" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input size="large" variant="filled" placeholder="+91" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input size="large" variant="filled" placeholder="john.doe@company.com" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Date of birth"
                        name="dateOfBirth"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <DatePicker size="large" variant="filled" placeholder="12.12.1975" />
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
}

export default BookingPassengerCard;