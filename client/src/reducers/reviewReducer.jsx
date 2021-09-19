import { ADD_REVIEW, REVIEW_LOADED_FAIL, REVIEW_LOADED_SUCCESS } from "../contexts/constants";

export const reviewReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case ADD_REVIEW:
            return {
                ...state,
                reviews: payload
            }
        case REVIEW_LOADED_SUCCESS:
            return {
                ...state,
                reviews: payload
            }
        case REVIEW_LOADED_FAIL:
            return {
                ...state,
                reviews: []
            }
        default:
            return state;
    }
}