import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('should setup default filtr values', () => {
    const state = filtersReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual({
        text:'',
        sortBy:'date',
        startDate:moment().startOf('month').valueOf(),
        endDate:moment().endOf('month').valueOf()
    })     
})


test('should set sortby to amount', () => {
    const state = filtersReducer(undefined, {type:'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount')
})


test('should set sortby to date', () => {
    const currentState = {
        text:'',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined
    }
    const state = filtersReducer(currentState, {type:'SORT_BY_DATE'})
    expect(state.sortBy).toBe('date')
})


test('should set text filter', () => {
    const state = filtersReducer(undefined, {type:'SET_TEXT_FILTER', text:'e'})
    expect(state.text).toBe('e')
})


test('should set start date', () => {
    const state = filtersReducer(undefined, {type:'SET_START_DATE', startDate:25})
    expect(state.startDate).toBe(25)
})



test('should set end date', () => {
    const state = filtersReducer(undefined, {type:'SET_END_DATE', endDate:26})
    expect(state.endDate).toBe(26)
})