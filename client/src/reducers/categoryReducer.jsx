import { ADD_CATEGORY, CATE_LOADED_FAIL, CATE_LOADED_SUCCESS, DELETE_CATEGORY, UPDATE_CATEGORY } from "../contexts/constants";


export const categoryReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case CATE_LOADED_SUCCESS:
            return {
                ...state,
                categories: payload
            }
        case CATE_LOADED_FAIL:
            return {
                ...state,
                categories: []
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, payload]
            }
        case UPDATE_CATEGORY:

            const newCate = state.categories.map(cate => 
                cate._id === payload._id ? payload : cate    
            )
            return {
                ...state,
                categories: newCate
            }
        case DELETE_CATEGORY:
            return{
                ...state,
                categories: state.categories.filter(cate => cate._id !== payload)
            }
        default:
            return state;
    }
}