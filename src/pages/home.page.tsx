import {
    Button,
    DatePicker,
    Flex,
    Form,
    type FormProps,
    InputNumber,
    Radio,
    Select,
    Typography
} from "antd";
import styles from './page.module.scss'
import {UserOutlined} from "@ant-design/icons";
import railwayStations from "../shared/constants/railway-stations-mock.data.ts";
import {useNavigate} from "react-router";

const { Title } = Typography;
const { RangePicker } = DatePicker;

type TripVariant = 'oneWay' | 'roundTrip';

interface FieldType {
    tripVariant: TripVariant;
    departure: string;
    arrival: string;
    date: string[] | string;
    passengers: number;
}

const stationOptions = railwayStations.map((s) => ({
    label: s.name,
    value: s.code,
}))

function HomePage() {
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const params = new URLSearchParams(window.location.search);

        params.set('tripVariant', values.tripVariant);
        params.set('departure', values.departure);
        params.set('arrival', values.arrival);
        if (values.date instanceof Array) {
            params.set('date', values.date.join('_'));
        }
        else {
            params.set('date', values.date);
        }
        params.set('passengers', values.passengers.toString());

        navigate({
            pathname: '/search-results',
            search: params.toString(),
        });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const digitSpinnerProps = {
        mode: 'spinner' as const,
        min: 1,
        max: 10,
        defaultValue: 3,
        style: { width: 150 },
    }

    return (
        <div className={styles.homePageContainer}>
            <Title className={styles.title}>Search Results</Title>

            <Form
                name="basic"
                layout="vertical"
                style={{ maxWidth: '100%' }}
                initialValues={{
                    tripVariant: 'roundTrip',
                    departure: stationOptions[0].value,
                    arrival: stationOptions[1].value,
                    passengers: 1
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="large"
            >
                <Flex className={styles.tripAndPassengerInput} justify="space-between" align="center" wrap gap={16}>
                    <Form.Item
                        className={styles.formItem}
                        name="tripVariant"
                        rules={[{ required: true, message: 'Please pick an item!' }]}
                    >
                        <Radio.Group
                            size="large"
                            options={[
                                {
                                    value: 'roundTrip',
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            Round Trip
                                        </Flex>
                                    ),
                                },
                                {
                                    value: 'oneWay',
                                    label: (
                                        <Flex gap="small" justify="center" align="center" vertical>
                                            One Way
                                        </Flex>
                                    ),
                                },
                            ]}
                        />
                    </Form.Item>
                    <Flex gap={4}>
                        <UserOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
                        <Form.Item className={styles.formItem} name="passengers">
                            <InputNumber {...digitSpinnerProps} variant="borderless" placeholder="Outlined" />
                        </Form.Item>
                    </Flex>
                </Flex>

                <Flex gap={32} wrap className={styles.departureAndArrivalContainer}>
                    <Form.Item name="departure" className={styles.formItem} label="Departure" rules={[{ required: true, message: 'Please select departure station' }]}>
                        <Select options={stationOptions} />
                    </Form.Item>

                    <Form.Item name="arrival" className={styles.formItem} label="Arrival"  rules={[{ required: true, message: 'Please select arrival station' }]}>
                        <Select options={stationOptions} />
                    </Form.Item>
                </Flex>
                <Flex gap={32} wrap>
                    <Form.Item noStyle dependencies={["tripVariant"]}>
                        {({ getFieldValue }) =>
                            getFieldValue('tripVariant') === 'roundTrip' ? (
                                <Form.Item name="date" className={styles.formItem} label="Pick your lucky day" rules={[{ required: true, message: 'Please select date' }]}>
                                    <RangePicker style={{ width: '100%' }} />
                                </Form.Item>
                            ) : <Form.Item name="date" className={styles.formItem} label="Pick your lucky day" rules={[{ required: true, message: 'Please select date' }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                        }
                    </Form.Item>
                </Flex>
                <Form.Item label={null}>
                    <Button style={{ marginTop: 24 }} size="large" block type="primary" htmlType="submit">
                        Ticket, Please!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default HomePage;