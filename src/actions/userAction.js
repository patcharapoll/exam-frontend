import * as types from "./types";

export const createUser = name => ({
    type: types.CREATE_USER,
    payload: name
})

export const getUser = name => ({
    type: types.GET_USER,
    payload: name
})

