import { ADD_MESSAGE, MESS_LOADED_SUCCESS, MESS_LOADED_FAIL, CONVERSATION_LOADED_SUCCESS, CONVERSATION_LOADED_FAIL} from "../contexts/constants";

export const MessageReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case MESS_LOADED_SUCCESS:
            return {
                ...state,
                messages: payload
            }
        case MESS_LOADED_FAIL:
            return {
                ...state,
                messages: []
            }
        case CONVERSATION_LOADED_SUCCESS:
            return {
                ...state,
                conversations: payload
            }
        case CONVERSATION_LOADED_FAIL:
            return {
                ...state,
                conversations: {}
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        default:
            return state;
    }
}