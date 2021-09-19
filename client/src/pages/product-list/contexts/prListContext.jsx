import { createContext, useState } from "react";


export const PrListContext = createContext();

const PrListContextProvider = ({children}) => {

    const [categoryKey, setCategoryKey] = useState('category=null'); 
    const [priceRangeKey, setPriceRangeKey] = useState('price=null'); 
    const [colorKey, setColorKey] = useState('color=null'); 
    const filterKey =  categoryKey + '&' + priceRangeKey + '&' + colorKey;
    const [sortKey, setSortKey] = useState('popular');
    const [page, setPage] = useState(0);
    const [loadMore, setLoadMore] = useState(false);
    //console.log(categoryKey);console.log(priceRangeKey);console.log(colorKey)

    //Action
    const handlePageAction = () => {
        setLoadMore(true);
        setPage(page + 1);
    }
    //Prlistcontext data
    const prListContextData = {
        filterKey,
        sortKey,
        setSortKey,
        setCategoryKey,
        setPriceRangeKey,
        setColorKey,
        page,
        setPage,
        loadMore,
        setLoadMore,
        handlePageAction
    }
    return (
        <PrListContext.Provider value={prListContextData}>
            {children}
        </PrListContext.Provider>
    )
}

export default PrListContextProvider