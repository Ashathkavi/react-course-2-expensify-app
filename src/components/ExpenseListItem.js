import React from 'react'
import {Link} from 'react-router-dom'


const ExpenseListItem = (props) => (
    <div>
        
        <Link to= {`/edit/${props.id}`}>
            <h4>Description: {props.description}</h4>
        </Link>
        <p>Amount: {props.amount}</p>
        <p>CreatedAt: {props.createdAt}</p>


    </div>
)


export default ExpenseListItem