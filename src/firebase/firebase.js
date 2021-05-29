import firebase from 'firebase/app'
import 'firebase/database'


var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database()

export {firebase, database as default}



/*
//child_remove
database.ref('expenses').on('child_removed', (snapshot)=>{
  console.log(snapshot.key, snapshot.val())
})

//child_changed
database.ref('expenses').on('child_changed', (snapshot)=>{
  console.log(snapshot.key, snapshot.val())
})

//child_added
database.ref('expenses').on('child_added', (snapshot)=>{
  console.log(snapshot.key, snapshot.val())
})
*/




/*

database.ref('expenses')
  .on('value', (snapshot)=>{
    const expenses = []
    snapshot.forEach((childSnapshot)=>{
      expenses.push({
        id:childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    console.log(expenses)
  }, (e)=>{
    console.log('Error with data fetching: ', e)
  })
  */

/*
database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    const expenses = []
    snapshot.forEach((childSnapshot)=>{
      expenses.push({
        id:childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    console.log(expenses)
  })
*/

/*
database.ref('expenses').push({
  description:'Gum',
  note:'',
  amount:195,
  createdAt:0
})
*/

//database.ref('notes/-MaoEfGNOpmyoEtXkqTH').remove()
  



/*
database.ref('notes').push({
  title:'Course Topics',
  body:'React Native, Angular, React'
})
*/


/*
const notes = [{
  id:'12',
  title:'First note!',
  body:'This is my note'
},{
  id:'761ase',
  title:'Another note',
  body:'This is my note'
}]

database.ref('notes').set(notes)
database.ref('notes/12')


*/








/*
database.ref().on('value', (snapshot)=>{
  const val = snapshot.val()
  console.log(`${val.name} is a ${val.job.title}at ${val.job.company}`)
}, (e)=>{
  console.log('Error with data fetching: ', e)
})


*/


/*
setTimeout(()=>{
  database.ref('age').set(30)
}, 3500) 


setTimeout(()=>{
  database.ref().off(onValueChange)
}, 7000)



setTimeout(()=>{
  database.ref('age').set(32)
}, 10500)
*/
/*
database.ref('location')
.once('value')
.then((snapshot)=>{
  const val = snapshot.val()
  console.log(val)
})
.catch((e)=>{
  console.log('Error fetching date', e)
})
*/



/*
  database.ref().set({
      name:'Ashathkavi',
      age:26,
      stressLevel:6,
      job:{ 
        title:'Software developer',
        company:'Google'
      },
      location:{
          city:'Batticaloa',
          country:'UnitedState'
      }
  }).then(()=>{
    console.log('Data is saved')
  }).catch((e)=>{
    console.log('this failed', e)
  })

*/




/*
  //attribute Setting....................................
  database.ref('location/city').set('Jaffna')

  database.ref('attribute').set({
    height:5.6,
    weight:82
  }).then(()=>{
    console.log('attribute Data is saved')
  }).catch((e)=>{
    console.log('attribute Data saving is failed: ', e)
  })

  //console.log('I made a request to change the data')
*/



//Updating...........................
/*
database.ref().update({
  stressLevel:9,
  'job/company':'Amazon',
  'location/city':'trincomalee'
})
*/

//Removing.............................
/*
database.ref('isSingle').set(null) 
OR
database.ref().remove()
  .then(()=>{
    console.log("Remove succeeded.")
  }).catch((error)=>{
    console.log("Remove failed: " + error.message)
  })
*/