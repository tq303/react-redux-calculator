const reducer = ( state = {}, action ) => {

    const DEFAULT_STATE = {
        number: 0,
        total: 0,
        operator: null,
        reset: false,
        decimal: false
    }

    switch ( action.type ) {

        case 'APPEND_NUMBER':

            if ( state.number === 0 || state.reset ) {

                state = Object.assign({}, state, {
                    number: action.number
                })

            } else if ( action.number === '.' ) {

                state = Object.assign({}, state, {
                    reset: false,
                    decimal: true
                })

            } else {

                let number;

                if ( state.decimal && Math.floor( state.number ) === state.number ) {
                    number = Number( String( state.number ) + '.' + String( action.number ) );
                } else {
                    number = Number( String( state.number ) + String( action.number ) );
                }

                state = Object.assign({}, state, {
                    number: number,
                    decimal: false
                })

            }

            state = Object.assign({}, state, {
                reset: false,
            })

            break

        case 'MODIFY_NUMBER':

            if (state.operator === null) {

                state = Object.assign({}, state, {
                    total: state.number,
                    operator: action.operator
                })

            } else {

                state = Object.assign({}, state, {
                    total: currentTotal( state, action ),
                    operator: action.operator
                })

            }

            state = Object.assign({}, state, {
                reset: true
            })

            break

        case 'CALCULATE_NUMBER':

            state = {
                number: currentTotal( state, state ),
                total: 0,
                operator: null,
                reset: true
            }

            break

        case 'CLEAR_ALL':

            state = DEFAULT_STATE

            break

        default:

            state = DEFAULT_STATE

            break

    }

    return state
}

const currentTotal = ( state, action) => {

    console.log('getting total')

    let currentTotal = 0

    switch( action.operator ) {
        case '+':
            currentTotal = ( state.total + state.number )
            break
        case '-':
            currentTotal = ( state.total - state.number )
            break
        case '÷':
            currentTotal = ( state.total / state.number )
            break
        case 'x':
            currentTotal = ( state.total * state.number )
            break
    }

    return currentTotal
}

export default reducer
