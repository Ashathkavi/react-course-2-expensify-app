

const getTotalExpenses = (expenses) => {
    return expenses
        .map((expense)=>expense.amount)
        .reduce((sum, value) => sum+value,0)     
}

export default getTotalExpenses 

/*let totalExpense = 0
    console.log(expenses.length)
    if(expenses.length !== 0){
        return expenses
            .map((expense)=>expense.amount)
            .reduce((sum, value) => sum+value,0)     
    }    
    return totalExpense*/