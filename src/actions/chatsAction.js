import * as types from "./types";

export const addMessage = message => ({
    type: types.ADD_MESSAGE,
    payload: message
})
