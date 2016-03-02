import React, { Component } from  'react'
import ReactDom from  'react-dom'
import { createStore } from 'redux'

import reducer from './reducers'

require('./styles/style.scss')

const store = createStore( reducer )

const Btn = ({ onClick, value }) => ( <span onClick={ onClick } >{ value }</span> )
const Operator = ({ onClick, op }) => ( <span onClick={ onClick }  className="operator">{ op }</span> )
const Sum = ({ onClick, value }) => ( <span className="eval" onClick={ onClick }>{ value }</span> )

const appendNumber = number => {
    store.dispatch({
        type: 'APPEND_NUMBER',
        number
    })
}

const modifyNumber = operator => {
    store.dispatch({
        type: 'MODIFY_NUMBER',
        operator
    })
}

const calculateNumber = () => {
    store.dispatch({
        type: 'CALCULATE_NUMBER',
    })
}

class Calculator extends Component {
    render() {
        return (
            <div id="calculator">

            	<div className="top">
            		<span className="clear" onClick={ ()=> store.dispatch({ type: 'CLEAR_ALL' }) }>C</span>
            		<div className="screen">{ store.getState().number }</div>
            	</div>

            	<div className="keys">
            		<Btn onClick={ () => appendNumber( value ) } value={ 7 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ 8 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ 9 }/>
            		<Operator onClick={ () => modifyNumber( op ) } op={ '+' } />
            		<Btn onClick={ () => appendNumber( value ) } value={ 4 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ 5 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ 6 }/>
            		<Operator onClick={ () => modifyNumber( op ) } op={ '-' } />
            		<Btn onClick={ () => appendNumber( value ) } value={ 1 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ 2 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ 3 }/>
            		<Operator onClick={ () => modifyNumber( op ) } op={ '÷' } />
            		<Btn onClick={ () => appendNumber( value ) } value={ 0 }/>
            		<Btn onClick={ () => appendNumber( value ) } value={ '.' }/>
            		<Sum onClick={ calculateNumber } value={ '=' }/>
            		<Operator onClick={ () => modifyNumber( op ) } op={ 'x' } />
            	</div>

            </div>
        )
    }
}

function render() {
    ReactDom.render(
        <Calculator/>,
        document.getElementById('root')
    )
}

render()

store.subscribe( render )
