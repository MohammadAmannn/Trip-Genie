export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        // description: 'Best Solo Trip',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'Friends',
        // description: 'Fun With Friends.',
        icon: '👫',
        people: '2+'
    },
    {
        id: 3,
        title: 'Family',
        // description: 'A Group of Fun Loving ',
        icon: '👪',
        people: '3+'
    },
    {
        id: 4,
        title: 'Couples',
        // description: '  Provides Best Travel Expirence.',
        icon: '❤️',
        people: '2'
    }
];

export const SelectBudgetOption=[
    {
        id:1,
        title:'Cheap',
        // description:'Budget',
        icon:'💰',
        price:'₹1000'
    },
    {
        id:2,
        title:'Modrate',
        // description:'Budget',
        icon:'💰',
        price:'₹2000'
    },
  
    
    {
        id:3,
        title:'Luxury',
        // description:'Budget',
        icon:'💰',
        price:'₹50000'
    }
    
]

export const AI_PROMPT='Genrate Travel Plan for location:{location},for {totaldays} Days for {traveler} with a {budget},give me hotel option list with hotel name,hotel address ,price,hotel image url,geo cordinate,ratings,descriptions and sugget itinerary with placename,place detail,place image url,geo cordinates,ticket pricing,time to travel each of the loacation for {total days} days with each day plan with best time to visit in json format'