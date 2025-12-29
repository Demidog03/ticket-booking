export interface StationInfo {
    station: string;
    code: string;
    time: string;
    date: string;
}

export type AvailabilityStatus =
    | { type: "available"; count: number }
    | { type: "waitlist"; position: number };

export type FareType = "General" | "Tatkal";

export type ClassCode = "3A" | "2A" | "1A";

export interface TrainClass {
    classCode: ClassCode;
    className: string;
    availability: AvailabilityStatus;
    fareType: FareType;
    price: number;
}

export interface Train {
    id: number;
    trainNumber: string;
    trainName: string;
    from: StationInfo;
    to: StationInfo;
    duration: string;
    classes: TrainClass[];
}

const trainsMockData: Train[] = [
    {
        id: 1,
        trainNumber: "22426",
        trainName: "VANDE BHARAT",
        from: {
            station: "New Delhi",
            code: "NDLS",
            time: "06:00",
            date: "29 Dec"
        },
        to: {
            station: "Mumbai Central",
            code: "BCT",
            time: "22:30",
            date: "29 Dec"
        },
        duration: "16h 30m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 46
                },
                fareType: "Tatkal",
                price: 800
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 23
                },
                fareType: "Tatkal",
                price: 1200
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "waitlist",
                    position: 12
                },
                fareType: "Tatkal",
                price: 2100
            }
        ]
    },
    {
        id: 2,
        trainNumber: "12301",
        trainName: "RAJDHANI EXP",
        from: {
            station: "Mumbai Central",
            code: "BCT",
            time: "16:55",
            date: "29 Dec"
        },
        to: {
            station: "New Delhi",
            code: "NDLS",
            time: "08:35",
            date: "30 Dec"
        },
        duration: "15h 40m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 12
                },
                fareType: "General",
                price: 1450
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "waitlist",
                    position: 5
                },
                fareType: "General",
                price: 2050
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 8
                },
                fareType: "General",
                price: 3500
            }
        ]
    },
    {
        id: 3,
        trainNumber: "12628",
        trainName: "KARNATAKA EXP",
        from: {
            station: "New Delhi",
            code: "NDLS",
            time: "20:30",
            date: "29 Dec"
        },
        to: {
            station: "Bengaluru City Junction",
            code: "SBC",
            time: "06:00",
            date: "31 Dec"
        },
        duration: "33h 30m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 125
                },
                fareType: "General",
                price: 545
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 67
                },
                fareType: "General",
                price: 1390
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "waitlist",
                    position: 36
                },
                fareType: "Tatkal",
                price: 1980
            }
        ]
    },
    {
        id: 4,
        trainNumber: "12002",
        trainName: "SHATABDI EXP",
        from: {
            station: "New Delhi",
            code: "NDLS",
            time: "06:15",
            date: "29 Dec"
        },
        to: {
            station: "Chandigarh",
            code: "CDG",
            time: "09:30",
            date: "29 Dec"
        },
        duration: "3h 15m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 95
                },
                fareType: "General",
                price: 520
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 18
                },
                fareType: "General",
                price: 1040
            }
        ]
    },
    {
        id: 5,
        trainNumber: "12860",
        trainName: "GITANJALI EXP",
        from: {
            station: "Chennai Central",
            code: "MAS",
            time: "18:55",
            date: "29 Dec"
        },
        to: {
            station: "Kolkata Howrah",
            code: "HWH",
            time: "05:45",
            date: "31 Dec"
        },
        duration: "34h 50m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 89
                },
                fareType: "Tatkal",
                price: 720
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 45
                },
                fareType: "Tatkal",
                price: 1680
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 3
                },
                fareType: "Tatkal",
                price: 2350
            }
        ]
    },
    {
        id: 6,
        trainNumber: "12430",
        trainName: "DURONTO EXP",
        from: {
            station: "Lucknow Junction",
            code: "LJN",
            time: "21:45",
            date: "29 Dec"
        },
        to: {
            station: "New Delhi",
            code: "NDLS",
            time: "06:20",
            date: "30 Dec"
        },
        duration: "8h 35m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 58
                },
                fareType: "General",
                price: 890
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 31
                },
                fareType: "General",
                price: 1340
            }
        ]
    },
    {
        id: 7,
        trainNumber: "12951",
        trainName: "MUMBAI RAJDHANI",
        from: {
            station: "Mumbai Central",
            code: "BCT",
            time: "17:20",
            date: "29 Dec"
        },
        to: {
            station: "New Delhi",
            code: "NDLS",
            time: "09:15",
            date: "30 Dec"
        },
        duration: "15h 55m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 18
                },
                fareType: "Tatkal",
                price: 1520
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "waitlist",
                    position: 7
                },
                fareType: "Tatkal",
                price: 2180
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 5
                },
                fareType: "Tatkal",
                price: 3890
            }
        ]
    },
    {
        id: 8,
        trainNumber: "12424",
        trainName: "DIBRUGARH RAJDHANI",
        from: {
            station: "New Delhi",
            code: "NDLS",
            time: "11:00",
            date: "29 Dec"
        },
        to: {
            station: "Guwahati",
            code: "GHY",
            time: "18:30",
            date: "30 Dec"
        },
        duration: "31h 30m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 92
                },
                fareType: "General",
                price: 2145
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 41
                },
                fareType: "General",
                price: 3025
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 14
                },
                fareType: "General",
                price: 5120
            }
        ]
    },
    {
        id: 9,
        trainNumber: "12229",
        trainName: "LUCKNOW MAIL",
        from: {
            station: "Mumbai Central",
            code: "BCT",
            time: "23:05",
            date: "29 Dec"
        },
        to: {
            station: "Lucknow Junction",
            code: "LJN",
            time: "06:50",
            date: "31 Dec"
        },
        duration: "31h 45m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 156
                },
                fareType: "General",
                price: 615
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 73
                },
                fareType: "General",
                price: 1565
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 28
                },
                fareType: "General",
                price: 2245
            }
        ]
    },
    {
        id: 10,
        trainNumber: "12137",
        trainName: "PUNJAB MAIL",
        from: {
            station: "Chhatrapati Shivaji Terminus",
            code: "CSMT",
            time: "19:40",
            date: "29 Dec"
        },
        to: {
            station: "Amritsar Junction",
            code: "ASR",
            time: "05:15",
            date: "31 Dec"
        },
        duration: "33h 35m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 112
                },
                fareType: "Tatkal",
                price: 825
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 58
                },
                fareType: "Tatkal",
                price: 1890
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "waitlist",
                    position: 22
                },
                fareType: "Tatkal",
                price: 2680
            }
        ]
    },
    {
        id: 11,
        trainNumber: "12621",
        trainName: "TAMIL NADU EXP",
        from: {
            station: "New Delhi",
            code: "NDLS",
            time: "22:30",
            date: "29 Dec"
        },
        to: {
            station: "Chennai Central",
            code: "MAS",
            time: "07:15",
            date: "31 Dec"
        },
        duration: "32h 45m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 203
                },
                fareType: "General",
                price: 680
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 84
                },
                fareType: "General",
                price: 1745
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 37
                },
                fareType: "General",
                price: 2485
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 9
                },
                fareType: "General",
                price: 4230
            }
        ]
    },
    {
        id: 12,
        trainNumber: "12615",
        trainName: "GRAND TRUNK EXP",
        from: {
            station: "Chennai Central",
            code: "MAS",
            time: "08:00",
            date: "29 Dec"
        },
        to: {
            station: "New Delhi",
            code: "NDLS",
            time: "18:30",
            date: "30 Dec"
        },
        duration: "34h 30m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 178
                },
                fareType: "General",
                price: 695
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 25
                },
                fareType: "Tatkal",
                price: 1780
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 11
                },
                fareType: "Tatkal",
                price: 2520
            }
        ]
    },
    {
        id: 13,
        trainNumber: "12869",
        trainName: "CSMT HOWRAH SF",
        from: {
            station: "Chhatrapati Shivaji Terminus",
            code: "CSMT",
            time: "18:00",
            date: "29 Dec"
        },
        to: {
            station: "Kolkata Howrah",
            code: "HWH",
            time: "09:45",
            date: "31 Dec"
        },
        duration: "39h 45m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 134
                },
                fareType: "General",
                price: 895
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 56
                },
                fareType: "General",
                price: 2145
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 19
                },
                fareType: "General",
                price: 3045
            }
        ]
    },
    {
        id: 14,
        trainNumber: "12723",
        trainName: "TELANGANA EXP",
        from: {
            station: "Hyderabad Deccan",
            code: "HYB",
            time: "15:50",
            date: "29 Dec"
        },
        to: {
            station: "New Delhi",
            code: "NDLS",
            time: "14:30",
            date: "30 Dec"
        },
        duration: "22h 40m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 67
                },
                fareType: "Tatkal",
                price: 745
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 34
                },
                fareType: "Tatkal",
                price: 1625
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 16
                },
                fareType: "Tatkal",
                price: 2315
            }
        ]
    },
    {
        id: 15,
        trainNumber: "12431",
        trainName: "TRIVANDRUM RAJDHANI",
        from: {
            station: "Trivandrum Central",
            code: "TVC",
            time: "10:30",
            date: "29 Dec"
        },
        to: {
            station: "Hazrat Nizamuddin",
            code: "NZM",
            time: "11:15",
            date: "31 Dec"
        },
        duration: "48h 45m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 102
                },
                fareType: "General",
                price: 2890
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 48
                },
                fareType: "General",
                price: 4125
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 21
                },
                fareType: "General",
                price: 6950
            }
        ]
    },
    {
        id: 16,
        trainNumber: "12009",
        trainName: "SHATABDI EXP",
        from: {
            station: "Mumbai Central",
            code: "BCT",
            time: "06:25",
            date: "29 Dec"
        },
        to: {
            station: "Ahmedabad Junction",
            code: "ADI",
            time: "13:10",
            date: "29 Dec"
        },
        duration: "6h 45m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 142
                },
                fareType: "General",
                price: 635
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 26
                },
                fareType: "General",
                price: 1270
            }
        ]
    },
    {
        id: 17,
        trainNumber: "12295",
        trainName: "SANGHAMITRA EXP",
        from: {
            station: "Bengaluru City Junction",
            code: "SBC",
            time: "12:00",
            date: "29 Dec"
        },
        to: {
            station: "Patna Junction",
            code: "PNBE",
            time: "08:45",
            date: "31 Dec"
        },
        duration: "44h 45m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 189
                },
                fareType: "General",
                price: 925
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 71
                },
                fareType: "General",
                price: 2215
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "waitlist",
                    position: 14
                },
                fareType: "Tatkal",
                price: 3145
            }
        ]
    },
    {
        id: 18,
        trainNumber: "22691",
        trainName: "RAJDHANI EXP",
        from: {
            station: "Hazrat Nizamuddin",
            code: "NZM",
            time: "16:00",
            date: "29 Dec"
        },
        to: {
            station: "Bengaluru City Junction",
            code: "SBC",
            time: "06:30",
            date: "31 Dec"
        },
        duration: "38h 30m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 42
                },
                fareType: "Tatkal",
                price: 2345
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "waitlist",
                    position: 19
                },
                fareType: "Tatkal",
                price: 3345
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 7
                },
                fareType: "Tatkal",
                price: 5680
            }
        ]
    },
    {
        id: 19,
        trainNumber: "12433",
        trainName: "HAZRAT NIZAMUDDIN EXP",
        from: {
            station: "Rajkot Junction",
            code: "RJT",
            time: "21:15",
            date: "29 Dec"
        },
        to: {
            station: "Hazrat Nizamuddin",
            code: "NZM",
            time: "05:30",
            date: "31 Dec"
        },
        duration: "32h 15m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 98
                },
                fareType: "General",
                price: 785
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "available",
                    count: 45
                },
                fareType: "General",
                price: 1845
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 22
                },
                fareType: "General",
                price: 2625
            }
        ]
    },
    {
        id: 20,
        trainNumber: "12217",
        trainName: "SAMPARK KRANTI",
        from: {
            station: "Pune Junction",
            code: "PUNE",
            time: "13:45",
            date: "29 Dec"
        },
        to: {
            station: "Jaipur Junction",
            code: "JP",
            time: "18:20",
            date: "30 Dec"
        },
        duration: "28h 35m",
        classes: [
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 145
                },
                fareType: "Tatkal",
                price: 695
            },
            {
                classCode: "3A",
                className: "Third AC",
                availability: {
                    type: "waitlist",
                    position: 73
                },
                fareType: "Tatkal",
                price: 1625
            },
            {
                classCode: "2A",
                className: "Second AC",
                availability: {
                    type: "available",
                    count: 6
                },
                fareType: "Tatkal",
                price: 2315
            },
            {
                classCode: "1A",
                className: "First AC",
                availability: {
                    type: "available",
                    count: 2
                },
                fareType: "General",
                price: 3945
            }
        ]
    }
];

export default trainsMockData;