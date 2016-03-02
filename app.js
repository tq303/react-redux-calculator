import React, { Component } from  'react'
import ReactDom from  'react-dom'
import { createStore } from 'redux'

import reducer from './reducers'

require('./styles/style.scss')

const store = createStore( reducer )

const Btn = ({ value }) => ( <span onClick={ () => appendNumber( value ) } >{ value }</span> )
const Operator = ({ op }) => ( <span onClick={ () => modifyNumber( op ) }  className="operator">{ op }</span> )
const Sum = ({ value }) => ( <span className="eval" onClick={ calculateNumber }>{ value }</span> )

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
            		<Btn value={ 7 }/>
            		<Btn value={ 8 }/>
            		<Btn value={ 9 }/>
            		<Operator op={ '+' } />
            		<Btn value={ 4 }/>
            		<Btn value={ 5 }/>
            		<Btn value={ 6 }/>
            		<Operator op={ '-' } />
            		<Btn value={ 1 }/>
            		<Btn value={ 2 }/>
            		<Btn value={ 3 }/>
            		<Operator op={ '÷' } />
            		<Btn value={ 0 }/>
            		<Btn value={ '.' }/>
            		<Sum value={ '=' }/>
            		<Operator op={ 'x' } />
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
