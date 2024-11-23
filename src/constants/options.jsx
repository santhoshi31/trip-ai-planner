export const SelectTravelsList =[

    {
        id:1,
        title:"Me",
        desc:'A solo trip',
        icon:'✈️',
        people:'1 person'
    },
    {
        id:2,
        title:"Couple",
        desc:'A couple trip',
        icon:'🧑‍🤝‍🧑',
        people:'2 people'
    },
    {
        id:3,
        title:"Family",
        desc:'A family trip',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:"Friends",
        desc:'A group trip',
        icon:'🥳',
        people:'5 to 10 people'
    }
]

// for budget option

export const SelectBudgetOption=[
    {
        id:1,
        title:'Affordable',
        desc:'Stay conscious with plan cost',
        icon:'💶'
    },
    {
        id:2,
        title:'Moderate',
        desc:'The average plan cost',
        icon:'💰'
    },
    {
        id:3,
        title:'Expensive',
        desc:'No worry about the plan cost',
        icon:'💸'
    },
]

export const AI_PROMPT='Generate Travel Plan for Location: My Trip Starting from {FLocation} To  {TLocation}, for {noOfDays} Days for {traveler} with the {budget}, Give me a Hotels option list with Hotel Name, Hotel address, Price, Hotel image URL, Geo coordinates, Rating, descriptions and suggest itinerary with place Name, place Details, place Image URL, Geo Coordinates, ticket pricing, rating, how much Time it takes to travel for each location, Each day plan with best time to visit the place, Include the travel cost and travel type with cost of it from place to place, Suggest Me the food that is popular in that place. in JSON form'