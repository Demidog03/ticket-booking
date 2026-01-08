import {Card, DatePicker, Form, Input} from "antd";
import classes from './booking.module.scss'
import type {Dayjs} from "dayjs";
import {forwardRef, useImperativeHandle} from "react";
import {useForm} from "antd/es/form/Form";
import {PatternFormat} from "react-number-format";

export interface BookingPassengerFormData {
    fullname?: string;
    phoneNumber?: string;
    email?: string;
    dateOfBirth: Dayjs | null;
}

export interface BookingPassengerCardRef {
    validate: () => Promise<BookingPassengerFormData | null>
}

const BookingPassengerCard = forwardRef<BookingPassengerCardRef, { passengerIndex: number }>(
    ({ passengerIndex }, ref) => {
        const [form] = useForm<BookingPassengerFormData>()

        useImperativeHandle(ref, () => ({
            validate: async () => {
                try {
                    const values = await form.validateFields()

                    return {
                        fullname: values.fullname || '',
                        phoneNumber: values.phoneNumber || '',
                        email: values.email || '',
                        dateOfBirth: values.dateOfBirth || null,
                    }
                } catch {
                    return null
                }
            }
        }))

        return (
            <Card className={classes.passengerFormCard}>
                <h2>Passenger {passengerIndex}</h2>
                <h3>Please enter your contact info</h3>

                <Form
                    form={form}
                    name={"passenger-info-form-" + passengerIndex}
                    layout="vertical"
                    autoComplete="off"
                >
                    <div className={classes.formContainer}>
                        <Form.Item<BookingPassengerFormData>
                            label="Full Name"
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your fullname!' }]}
                        >
                            <Input size="large" variant="filled" placeholder="Your name" />
                        </Form.Item>

                        <Form.Item<BookingPassengerFormData>
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <PatternFormat
                                format='+## #### ### ###'
                                mask='_'
                                customInput={Input}
                                placeholder="+91"
                                size="large"
                                variant="filled"
                            />
                        </Form.Item>

                        <Form.Item<BookingPassengerFormData>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!'}, { type: 'email', message: 'Email is not valid' }]}
                        >
                            <Input size="large" variant="filled" placeholder="john.doe@company.com" />
                        </Form.Item>

                        <Form.Item<BookingPassengerFormData>
                            label="Date of birth"
                            name="dateOfBirth"
                            rules={[{ required: true, message: 'Please input your date of birth!' }]}
                        >
                            <DatePicker size="large" variant="filled" placeholder="12.12.1975" />
                        </Form.Item>
                    </div>
                </Form>
            </Card>
        );
})

BookingPassengerCard.displayName = 'BookingPassengerCard'

export default BookingPassengerCard;