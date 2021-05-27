//Object destructuring

// const person = {
//     age:24,
//     location:{
//         city:'Batticaloa',
//         temp:34
//     }
// }

// const {name:firstname = 'Anonymous', age} = person
// const {city, temp:temperature} = person.location
 
// console.log(`${firstname} is ${age}.`)

// console.log(`Its ${temperature} in ${city}.`)



const book = {
    title:'Ego is the enymy',
    auther:'Ryan Holiday',
    publisher:{
        name:'Penguin',
    }
}

const {name:publisherName = 'Self-published'} = book.publisher

console.log(publisherName)




//Array destructuring


const address = ['1233 boundry road', 'Philadelphia', 'Pennsylvania', '12346'];

const [street, city, state, zip] = address
console.log(`You are in ${city} ${state}`)


const item = ['Coffee(hot)', '$2.00', '$2.50', '$2.75']
const [type, small, medium, large] = item
console.log(`A medium ${type}  cost ${medium})`)