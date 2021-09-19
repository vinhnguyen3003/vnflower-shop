import { INIT_SOCKET } from "../contexts/constants";


export const SocketReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case INIT_SOCKET:
            return {
                ...state,
                socket: payload
            }
        default:
            return state;
    }
}