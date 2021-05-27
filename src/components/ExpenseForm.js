import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'


const now = moment()
//console.log(now.format('MMM do, YYYY'))

class ExpenseForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            description:props.expense ? props.expense.description : '', 
            note:props.expense ? props.expense.note : '', 
            amount:props.expense ? (props.expense.amount / 100).toString() : '', 
            createdAt:props.expense ?  moment(props.expense.createdAt).toDate() : moment().toDate(),
            error:''
        }
        
    }
    
    
    onDescriptionChange = (e) => { 
        e.persist()
        this.setState(()=>({description:e.target.value}))
    }
    onNoteChange = (e) => {
        e.persist()
        this.setState(()=>({note:e.target.value}))
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/gm)){
            this.setState(()=>({amount}))
        }        
    }
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({createdAt}))
        }
    }
    onFocusChange = ({focused}) => {
        this.setState(()=>({calenderFocused:focused}))
    }
    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({error:'Please provide description and amount.'}))
        }else{
            this.setState(()=>({error:''}))
            this.props.onSubmit({
                description:this.state.description,
                amount:parseFloat(this.state.amount, 10) * 100,
                createdAt:this.state.createdAt.valueOf(),
                note:this.state.note
            })
        }
    }
    render(){
        //console.log(this.state.description)
        return(
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit = {this.onSubmit}>
                    <input 
                        typr="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}                        
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}                        

                    />
                    <DatePicker
                        selected = {this.state.createdAt}
                        onChange = {this.onDateChange}
                        closeOnScroll={e => e.target === document}
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>

                </form>
            </div>
        )
    }
}

export default ExpenseForm