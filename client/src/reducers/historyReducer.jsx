import { ADD_HISTORY } from "../contexts/constants";

const storage = (prHistorysParam) => {
    localStorage.setItem('HISTORY', JSON.stringify(prHistorysParam.length > 0 ? prHistorysParam : []));
}
export const HistoryReducer = (state, action) => {
    const {type, payload} = action;
    const newHistory = [...state.prHistorys];

    switch (type) {
        case ADD_HISTORY:
            let index = newHistory.findIndex(neHi => neHi._id === payload._id);
            if(index !== -1){
                newHistory.splice(index, 1);
                newHistory.splice(newHistory.length, 1, payload);
            }else{
                newHistory.push(payload);
            }
            storage(newHistory);
            return {
                ...state,
                prHistorys: newHistory
            }
        default:
            return state
    }
}