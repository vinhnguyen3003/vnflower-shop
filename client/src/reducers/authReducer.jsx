import { SET_AUTH } from "../contexts/constants";

export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, isAdmin, user} } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isWaiting: true,
                isAuthenticated,
                isAdmin,
                user
            }
            
        default:
            return state
    }
}