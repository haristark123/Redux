// Action Creators
const newBooking=(name,destination,amount) =>{
    return {
        type:'NEW_BOOKING',
        payload:{
            name,
            destination,
            amount
        }
    }
}
const cancelBooking=(name,destination,refundAmount) =>{
    return {
        type:'CANCEL_BOOKING',
        payload:{
            name,
            destination,
            refundAmount
        }
    }
}

//Reducers
const reservationHistory=(oldReservationHistory=[],action)=>{
    if (action.type==='NEW_BOOKING'){
        return [...oldReservationHistory,action.payload]
    }
    else if(action.type==='CANCEL_BOOKING'){
        return oldReservationHistory.filter(record=>{
            return record.name!==action.payload.name
        })
    }
    return oldReservationHistory

}

const cancellationHistory=(oldCancellationHistory=[],action)=>{
    if (action.type==='CANCEL_BOOKING'){
        return [...oldCancellationHistory,action.payload]
    }
    return oldCancellationHistory
}

const accounting=(totalAmount=100,action)=>{
    if (action.type==='NEW_BOOKING'){
        return totalAmount+action.payload.amount
    }
    else if(action.type==='CANCEL_BOOKING'){
        return totalAmount-action.payload.refundAmount
    }
    return totalAmount

}

//Store
console.log(Redux);
const { createStore,combineReducers } = Redux;

const railwayCentralStore=combineReducers({
    accounting:accounting,
    reservationHistory:reservationHistory,
    cancellationHistory:cancellationHistory

})

const store=createStore(railwayCentralStore)

store.dispatch(newBooking("haari","Banglore",2000))
store.dispatch(newBooking("kishann","chennai",1000))
store.dispatch(newBooking("haariKishann","Banglore",1500))
store.dispatch(cancelBooking("haariKishann","Banglore",2000))

console.log(store.getState()); 




//Steps
// 1.create Actions 
// 2.create Reducers
// 3.import combineReducers and createStore from redux
// 4.Combine reducers as an object
// 5.create store with the combine reducers
// 6.Then using the store dispatch the action to reducers like store.dispatch(action)
// 7.from the store get the statee in the form of props store.getState()