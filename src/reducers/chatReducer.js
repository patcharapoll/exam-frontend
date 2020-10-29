import * as types from "../actions/types"

const initialChat = {
    messages: [] 
}

const chatReducer = (state = initialChat, action) => {
    switch (action.type) {
        case types.ADD_MESSAGE:
            return state
        default:
            return state 
    }
}

export default chatReducer