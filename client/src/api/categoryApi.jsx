import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../contexts/constants';


function CategoryApi() {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false);
    
    useEffect(()=>{console.log(axios.defaults.headers.common['Authorization']);
        // const getCategories = async () => {
        //     const res = await axios.get(`${apiUrl}/category`);
        //     setCategories(res.data)
        // }
        // getCategories();
    },[callback])

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoryApi;