import food1 from '../../../assets/images/food1.jpg'
import food2 from '../../../assets/images/food2.jpg'
import food3 from '../../../assets/images/food3.jpg'

export interface BookingFood {
    id: string;
    name: string;
    price: number;
    image: string;
}

export const bookingFoods: BookingFood[] = [
    {
        id: 'paneer',
        name: 'Paneer Tikka Rice Bowl - Mini',
        price: 200,
        image: food1
    },
    {
        id: 'tandoori',
        name: 'Grilled Tandoori Chicken with dry fruits',
        price: 500,
        image: food2
    },
    {
        id: 'curd',
        name: 'Aloo Paratha Curd Meal (2 pcs)',
        price: 120,
        image: food3
    }
]