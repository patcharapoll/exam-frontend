import * as types from "../actions/types"

const initialUser = {
    name: ''
}

const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case types.CREATE_USER:
            return { ...state, name: action.payload }
        default:
            return state 
    }
}

export default userReducer