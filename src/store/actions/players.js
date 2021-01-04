import { ADD, PLAYER } from "../constants/actionTypes";

export const addPlayer = (payload) => ({
    type: `${ADD} ${PLAYER}`,
    payload,
})