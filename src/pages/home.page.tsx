import {
    Button,
    DatePicker,
    Flex,
    Form,
    type FormProps,
    InputNumber,
    Radio,
    type RadioChangeEvent, Select,
    Typography
} from "antd";
import styles from './page.module.scss'
import {useState} from "react";
import {UserOutlined} from "@ant-design/icons";

const { Title } = Typography;
const { RangePicker } = DatePicker;

type TripVariant = 'oneWay' | 'roundTrip';

interface FieldType {
    username?: string;
    password?: string;
    remember?: string;
}

function HomePage() {
    const [tripVariant, setTripVariant] = useState<TripVariant>('roundTrip');

    const onTripVariantChange = (e: RadioChangeEvent) => {
        setTripVariant(e.target.value);
    };

    const onNumberOfPassengersChange = (value: number) => {
        console.log(value);
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const digitSpinnerProps = {
        mode: 'spinner' as const,
        min: 1,
        max: 10,
        defaultValue: 3,
        onchange: onNumberOfPassengersChange,
        style: { width: 150 },
    }

    return (
        <div className={styles.homePageContainer}>
            <Title className={styles.title}>Search Results</Title>

            <Flex className={styles.tripAndPassengerInput} justify="space-between" align="center">
                <Radio.Group
                    onChange={onTripVariantChange}
                    value={tripVariant}
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
                <div>
                    <UserOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
                    <InputNumber {...digitSpinnerProps} variant="borderless" placeholder="Outlined" />
                </div>
            </Flex>

            <Form
                name="basic"
                layout="vertical"
                style={{ maxWidth: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="large"
            >
                <Flex gap={32} wrap>
                    <Form.Item className={styles.formItem} label="Departure">
                        <Select defaultValue="1" options={[{ label: 'New Delhi - NDLS', value: '1' }, { label: 'Lucknow Junction - LJN', value: '2' }]} />
                    </Form.Item>

                    <Form.Item className={styles.formItem} label="Arrival">
                        <Select defaultValue="2" options={[{ label: 'New Delhi - NDLS', value: '1' }, { label: 'Lucknow Junction - LJN', value: '2' }]} />
                    </Form.Item>
                </Flex>
                <Flex gap={32} wrap>
                    <Form.Item className={styles.formItem} label="Pick your lucky day">
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>
                <Form.Item label={null}>
                    <Button size="large" block type="primary" htmlType="submit">
                        Ticket, Please!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default HomePage;