import axios from "axios";
import { createContext, useReducer } from "react"
import { categoryReducer } from "../reducers/categoryReducer";
import { ADD_CATEGORY, apiUrl, CATE_LOADED_FAIL, CATE_LOADED_SUCCESS, DELETE_CATEGORY, UPDATE_CATEGORY } from "./constants";


export const CateContext = createContext();

const CateContextProvider = ({children}) => {
    //State
    const [cateState, dispatch] = useReducer(categoryReducer, {
        categories: []
    })
    //Get All Category
    const getCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category`);
            if(response.data.success){
                dispatch({
                    type: CATE_LOADED_SUCCESS,
                    payload: response.data.categories
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({type: CATE_LOADED_FAIL})
        }
    }
    //Add category
    const addCategory = async (addData) => {
        try {
            const response = await axios.post(`${apiUrl}/category/create`, addData);
            if(response.data.success) {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: response.data.category
                })
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
    //Update category
    const updateCategory = async (cateID, updateData) => {
        try {
            const response = await axios.put(`${apiUrl}/category/update/${cateID}`, updateData);
            if(response.data.success){
                dispatch({
                    type: UPDATE_CATEGORY,
                    payload: response.data.updatedCate
                })
                return response.data
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Delete Category
    const deleteCategory = async cateID => {
        try {
            const response = await axios.delete(`${apiUrl}/category/${cateID}`);
            if(response.data.success){
                dispatch({type: DELETE_CATEGORY, payload: cateID})
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    //Cate context data
    const cateContextData = {
        cateState,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    }

    return (
        <CateContext.Provider value={cateContextData}>
            {children}
        </CateContext.Provider>
    )
}

export default CateContextProvider