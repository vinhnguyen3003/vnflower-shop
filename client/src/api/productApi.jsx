import axios from "axios";
import { useEffect, useState } from "react";



function ProductApi() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    useEffect(()=>{
        // const getProducts = async () => {
        //    const res = await axios('/api/product');
        //    setProducts(res.data);
        // }
        // getProducts();
    },[callback])
    return {
        products: [products, setProducts],
        callback: [callback, setCallback]
    }
}

export default ProductApi;