import { ADD_NOTI, DELETE_NOTI, NOTI_LOADED_FAIL, NOTI_LOADED_SUCCESS, UPDATE_NOTI } from "../contexts/constants";

export const NotiReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case ADD_NOTI:
            return {
                ...state,
                notifications: payload
            }
        case NOTI_LOADED_SUCCESS:
            return {
                ...state,
                notifications: payload
            }
        case NOTI_LOADED_FAIL:
            return {
                ...state,
                notifications: []
            }
        case UPDATE_NOTI:
            const newNoti = state.notifications.map(noti => 
                noti._id === payload._id ? payload : noti
            )
            return {
                ...state,
                notifications: newNoti
            }
        case DELETE_NOTI:
            return {
                ...state,
                notifications: state.notifications.filter(noti => noti._id !== payload)
            }
        default:
            return state;
    }
}