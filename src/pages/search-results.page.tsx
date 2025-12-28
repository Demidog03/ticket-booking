import {useCallback, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router";
import {Descriptions, type DescriptionsProps} from "antd";
import {getStationNameByCode, getTripVariantName} from "../shared/utils.ts";
import dayjs from "dayjs";

function SearchResultsPage() {
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

    const items: DescriptionsProps['items'] = useMemo(() => (
        [
            {
                key: '1',
                span: 2,
                label: 'Trip Variant',
                children: tripVariant ? getTripVariantName(tripVariant) : 'No data',
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

    return (
        <div>
            <Descriptions title="Search results" layout="vertical" items={items} column={4} />
        </div>
    );
}

export default SearchResultsPage;
