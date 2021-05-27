
import moment from 'moment'


//get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    //console.log(startDate, "startDate")
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMoment = moment(startDate)
        const endDateMoment = moment(endDate)
        //console.log(startDateMoment,'startDateMoment')
        // console.log(createdAtMoment,'createdAtMoment')
        // console.log(endDateMoment,'endDateMoment')

        const startDateMatch = startDate ? startDateMoment.isSameOrBefore(createdAtMoment, 'day'):true
        //const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = endDate ? endDateMoment.isSameOrAfter(createdAtMoment, 'day'):true
        //const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch

    }).sort((a,b)=>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
}

export default getVisibleExpenses