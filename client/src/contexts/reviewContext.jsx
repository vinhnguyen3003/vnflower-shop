import axios from "axios";
import { createContext, useReducer } from "react";
import { reviewReducer } from "../reducers/reviewReducer";
import { ADD_REVIEW, apiUrl, REVIEW_LOADED_FAIL, REVIEW_LOADED_SUCCESS } from "./constants";


export const ReviewContext = createContext();

const ReviewContextProvider = ({children}) => {

    const [reviewState, dispatch] = useReducer(reviewReducer, {
        reviews: []
    })
    //Add review
    const addReview = async (addData) => {
        try {
            const res = await axios.post(`${apiUrl}/review/create`, addData);
            if(res.data.success){
                dispatch({
                    type: ADD_REVIEW,
                    payload: res.data.reviews
                })
            }
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    //Get review
    const getReviews = async (productID) => {
        try {
            const res = await axios.get(`${apiUrl}/review/${productID}`);
            if(res.data.success){
                dispatch({
                    type: REVIEW_LOADED_SUCCESS,
                    payload: res.data.reviews
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({type: REVIEW_LOADED_FAIL})
        }
    }
    const reviewContextData = {
        reviewState,
        addReview,
        getReviews
    }

    return (
        <ReviewContext.Provider value={reviewContextData}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContextProvider;