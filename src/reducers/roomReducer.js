import * as types from "../actions/types"

const initialRoom = {
    roomName: '',
    roomList: []
}

const roomReducer = (state = initialRoom, action) => {
    switch (action.type) {
        case types.CREATE_ROOM:
            state.roomList.push(action.payload)
            return { ...state, roomName: action.payload }
        case types.SET_ROOM:
            return { ...state, roomName: action.payload }
        case types.SET_LIST_ROOM:
            return { ...state, roomList: action.payload }
        default:
            return state 
    }
}

export default roomReducer