import * as types from "./types";

export const createRoom = roomName => ({
    type: types.CREATE_ROOM,
    payload: roomName
})

export const setRoomList = roomList => ({
    type: types.SET_LIST_ROOM,
    payload: roomList
})

export const setRoom = roomName => ({
    type: types.SET_ROOM,
    payload: roomName
})

