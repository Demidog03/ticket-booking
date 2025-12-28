import railwayStations from "./constants/railway-stations-mock.data.ts";

export function getStationNameByCode(code: string) {
  return railwayStations.find((s) => s.code === code)?.name ?? 'Unknown station';
}

export function getTripVariantName(variant: string) {
    if (variant === 'roundTrip') {
        return 'Round Trip';
    }
    if (variant === 'oneWay') {
        return 'One Way'
    }
    return 'Unknown';
}