import React from 'react'
import {connect} from 'react-redux'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export class ExpenseListFilters extends React.Component{

    onDateChange = (dates) => {
        let [startDate, endDate] = dates;
        startDate = moment(startDate).valueOf()
        endDate =  moment(endDate).valueOf()
        //console.log(startDate,'start',endDate,'end')
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onSortChange = (e) => {
        e.target.value === "date" ? 
            this.props.sortByDate() 
        : 
            this.props.sortByAmount()
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }

    render(){
        return(
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
                <select 
                    value={this.props.filters.sortBy} 
                    onChange={this.onSortChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DatePicker
                    selected={this.props.filters.startDate}
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onChange= {this.onDateChange}
                    selectsRange
                    inline
                />

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        filters:state.filter
    }
} 

const mapDispatchToProps = (dispatch) => ({
    setTextFilter:(text) => dispatch(setTextFilter(text)), 
    sortByAmount:() => dispatch(sortByAmount()), 
    sortByDate:() => dispatch(sortByDate()), 
    setStartDate:(startDate) => dispatch(setStartDate(startDate)), 
    setEndDate:(enDate) => dispatch(setEndDate(enDate))
})

const connectedExpenseListFilters = connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)

export default connectedExpenseListFilters