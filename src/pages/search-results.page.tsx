import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {Badge, Descriptions, type DescriptionsProps, Flex, Typography} from "antd";
import {getStationNameByCode, getTripVariantName} from "../shared/utils.ts";
import dayjs from "dayjs";
import classes from './page.module.scss'
import TrainCard from "../modules/trains/ui/train-card.tsx";
import trainMockData, {type Train, type TrainClass} from "../shared/constants/train-mock.data.ts";
import BookingContext from "../modules/booking/context/booking-context.tsx";

const { Title } = Typography

const styles: DescriptionsProps['styles'] = {
    content: {
        color: '#1677ff',
        fontWeight: '500',
    },
    label: {
        color: '#000',
    },
    title: {
        fontSize: '2rem',
        color: '#1677ff',
    }
};

function SearchResultsPage() {
    const navigate = useNavigate();
    const { setBookingInfo } = useContext(BookingContext)
    const [departureDate, setDepartureDate] = useState<string | null>(null);
    const [arrivalDate, setArrivalDate] = useState<string | null>(null);

    const [searchParams] = useSearchParams()
    const tripVariant = searchParams.get('tripVariant')
    const departure = searchParams.get('departure')
    const arrival = searchParams.get('arrival')
    const date = searchParams.get('date')?.split('_')
    const passengers = parseInt(searchParams.get('passengers') ?? '0')
    
    const formatDate = useCallback(() => {
        if (date?.length === 1) {
            // Парсим дату в формате MM-DD-YYYY
            const parsed = dayjs(date[0]);
            console.log('Parsed departure:', parsed.format('DD MMM YYYY'))
            setDepartureDate(parsed.format('DD MMM YYYY'))
        }

        if (date?.length === 2) {
            // Парсим обе даты
            const parsedDeparture = dayjs(date[0]);
            const parsedArrival = dayjs(date[1]);

            console.log('Parsed departure:', parsedDeparture.format('DD MMM YYYY'))
            console.log('Parsed arrival:', parsedArrival.format('DD MMM YYYY'))

            setDepartureDate(parsedDeparture.format('DD MMM YYYY'))
            setArrivalDate(parsedArrival.format('DD MMM YYYY'))
        }
    }, [date])

    console.log(departureDate)
    console.log(arrivalDate)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        formatDate()
    }, [date, formatDate]);

    const filteredTrainMockData = useMemo(() => {
        let filtered = trainMockData.filter(t => (
            t.from.code === departure
            &&
            t.to.code === arrival
        ));

        // Фильтрация по дате отправления
        if (date && date.length >= 1) {
            const searchDepartureDate = dayjs(date[0]);


            filtered = filtered.filter(t => {
                // Парсим дату из формата "29 Dec"
                const trainDate = dayjs(t.from.date, 'DD MMM');

                // Сравниваем только день (date()) и месяц (month())
                return trainDate.date() === searchDepartureDate.date() &&
                    trainDate.month() === searchDepartureDate.month();
            });
        }

        // Для round trip - дополнительная фильтрация по дате возврата
        if (date && date.length === 2 && tripVariant === 'roundTrip') {
            const searchReturnDate = dayjs(date[1]);

            filtered = filtered.filter(t => {
                // Парсим дату прибытия
                const trainArrivalDate = dayjs(t.to.date, 'DD MMM');

                // Проверяем, что поезд прибывает не позже указанной даты возврата
                return trainArrivalDate.isBefore(searchReturnDate) ||
                    trainArrivalDate.isSame(searchReturnDate, 'day');
            });
        }

        return filtered;
    }, [arrival, departure, date, tripVariant]);

    const items: DescriptionsProps['items'] = useMemo(() => (
        [
            {
                key: '1',
                span: 2,
                label: 'Trip Variant',
                children: <Badge style={{ color: '#1677ff', }} status="processing" text={tripVariant ? getTripVariantName(tripVariant) : 'No data'} /> ,
            },
            {
                key: '2',
                span: 2,
                label: 'Passengers',
                children: passengers,
            },
            {
                key: '3',
                span: 2,
                label: 'Departure',
                children: departure ? getStationNameByCode(departure) : 'No data',
            },
            {
                key: '4',
                span: 2,
                label: 'Arrival',
                children: arrival ? getStationNameByCode(arrival) : 'No data',
            },
            {
                key: '5',
                span: 2,
                label: 'Departure Date',
                children: departureDate ?? 'No data',
            },
            {
                key: '6',
                span: 2,
                label: 'Return Date',
                children: arrivalDate ?? 'No data',
                // ?? null undefined
                // || на все falsy -> null, undefined, '', 0, false, NaN
            },
        ]
    ), [tripVariant, departure, arrival, arrivalDate, departureDate, passengers]);

    function goToReviewBookingPage(trainClass: TrainClass, train: Train) {
        setBookingInfo({
            date: date,
            arrival: arrival || undefined,
            departure: departure || undefined,
            passengers: passengers || undefined,
            tripVariant: tripVariant || undefined,
            selectedClassCode: trainClass.classCode,
            selectedTrain: train
        })
        navigate('/review-booking')
    }

    return (
        <div className={classes.searchResultsContainer}>
            <Descriptions className={classes.descriptions} styles={styles} title="Search results" layout="vertical" items={items} column={4} />
            <Title className={classes.title}>Available Trains</Title>
            <Flex className={classes.trainsCardsContainer} vertical gap={24}>
                {filteredTrainMockData.length < 1 ? (
                    <h2>No trains available</h2>
                ) : (
                    filteredTrainMockData.map((t) => (
                        <TrainCard
                            title={`${t.trainNumber} - ${t.trainName}`}
                            departure={{
                                date: t.from.date,
                                time: t.from.time,
                                station: t.from.station
                            }}
                            arrival={{
                                date: t.to.date,
                                time: t.to.time,
                                station: t.to.station
                            }}
                            duration={t.duration}
                            ticketClasses={t.classes}
                            onClickCard={(trainClass) => goToReviewBookingPage(trainClass, t)}
                        />
                    ))
                )}
            </Flex>
        </div>
    );
}

export default SearchResultsPage;
