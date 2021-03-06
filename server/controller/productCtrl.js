
const Product = require('./../models/productModel');

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    sortBy(){
        const sortKey = this.queryString.sortKey;
        if(sortKey !== undefined && sortKey !== 'null'){
            switch (sortKey) {
                case "popular":
                    this.query = this.query.sort('-ratingStar');
                    return this;
                case "newest":
                    this.query = this.query.sort('-createAt');
                    return this;
                case "discount":
                    this.query = this.query.find({"productPrice.discountPrice" : {$ne: 0}});
                    return this;
                case "special":
                    this.query = this.query;
                    return this;
                case "priceDesc":
                    this.query = this.query.sort('-productPrice.normalPrice');
                    return this;
                case "priceInc":
                    this.query = this.query.sort('productPrice.normalPrice');
                    return this;
                default:
                    return this.query
            }
        }
        return this
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
        console.log(queryObj.category)

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        console.log(queryObj)
        let queryStr = JSON.stringify(queryObj)
        console.log(queryStr)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        console.log(queryStr)
        console.log(JSON.parse(queryStr))
        this.query.find(JSON.parse(queryStr))
            
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
class HandleResult {
    constructor(product, queryString){
        this.product = product;
        this.queryString = queryString;
    }
    searchBy = () => {
        const queryString = this.queryString;
        if(queryString.searchKey !== 'null' && queryString.searchKey !== undefined){
            this.product = this.product.filter( pr => {
                return pr.productName.toLowerCase().indexOf(queryString.searchKey) > -1 || pr.productID.toLowerCase().indexOf(queryString.searchKey) > -1
            });
        }
        return this;
    }
    sortBy = () =>{
        const sortKey = this.queryString.sortKey;
        if(sortKey !== undefined && sortKey !== 'null'){
            switch (sortKey) {
                case "popular":
                    this.product = this.product.sort((a, b) => b.ratingStar - a.ratingStar);
                    return this;
                case "newest":
                    this.product = this.product.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));
                    return this;
                case "discount":
                    this.product = this.product.filter((pr) => pr.productPrice.discountPrice !== 0);
                    return this;
                case "special":
                    return this;
                case "priceDesc":
                    this.product = this.product.sort((a, b) => b.productPrice.normalPrice - a.productPrice.normalPrice);
                    return this;
                case "priceInc":
                    this.product = this.product.sort((a, b) => a.productPrice.normalPrice - b.productPrice.normalPrice);
                    return this;
                default:
                    return this.product;
            }
        }
        return this
    }
    advanceFilter = () => {
        const queryString = this.queryString;
        if(queryString.category !== 'null' && queryString.category !== undefined){//console.log(typeof(queryString.category))
            this.product = this.product.filter(pr => pr.category._id.toString() === queryString.category);
        }
        if(queryString.price !== 'null' && queryString.price !== undefined){
            let startPrice = ""
            let endPrice = ""
            let indexSeperation = queryString.price.indexOf('-');
            //Tr?????ng h???p t??m th???y k?? t??? ph??n c??ch - trong price
            if(indexSeperation !== -1){
                startPrice = queryString.price.slice(0, indexSeperation);
                endPrice = queryString.price.slice(indexSeperation + 1, queryString.price.length);
            }else{//Tr?????ng h???p t??m th???y
                startPrice = queryString.price;
            }
            function check(pr){
                const {discountPrice, normalPrice} = pr.productPrice;
                if(discountPrice !== 0) return discountPrice > parseInt(startPrice) && discountPrice < parseInt(endPrice)
                if(discountPrice === 0) return normalPrice > parseInt(startPrice) && normalPrice < parseInt(endPrice)
            }
            //Tr?????ng h???p D?????i v?? Gi???a kho???ng gi??
            if(endPrice !== ""){
                this.product = this.product.filter(pr => {
                    return check(pr)
                });
            }else{//Tr?????ng h???p tr??n gi??
                this.product = this.product.filter(pr => 
                    pr.productPrice.discountPrice !== 0 ? pr.productPrice.discountPrice > parseInt(startPrice):
                    pr.productPrice.normalPrice > parseInt(startPrice)
                )
            }
            //console.log(startPrice);console.log(endPrice)
        }
        if(queryString.color !== 'null' && queryString.color !== undefined){
            let color = '';
            switch (queryString.color) {
                case 'red':
                    color = 'M??u ?????'
                    break;
                case 'yellow':
                    color = 'M??u v??ng'
                    break;
                case 'pink':
                    color = 'M??u h???ng'
                    break;
                case 'white':
                    color = 'M??u tr???ng'
                    break;
                default: color = 'M??u ?????'
                    break;
            }
            function check(colorArr){
                for(let i = 0; i < colorArr.length; i++){
                    if(colorArr[i].title === color && colorArr[i].stock !== "0"){
                        return true;
                    }
                }
            }
            this.product = this.product.filter(pr=>{
                return check(pr.productOption.color)
            })
        }
        if(queryString.flashsale !== 'null' && queryString.flashsale !== undefined){
            if(queryString.flashsale === 'true'){
                this.product = this.product.filter(pr => pr.flashsaleType.flashStatus === true)
            }else{
                this.product = this.product.filter(pr => pr.flashsaleType.flashStatus === false)
            }
        }
        return this;
    }
    pagination = () => {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        //const skip = (page - 1) * limit;
        this.product = this.product.slice(0, limit);
        return this;
    }
}
const ProductCtrl = {
    
    getProducts: async (req, res) => {
        try {
            const productInAPI = await Product.find().sort('-createAt').populate('category');
            const result = new HandleResult(productInAPI, req.query).searchBy().pagination();
            const finalResult = await result.product;
            res.json({success: true, products: finalResult});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    },
    getProductByCondition: async (req, res) => {//console.log(req.query)
        try {
            const productInAPI = await Product.find().populate('category');
            const result = new HandleResult(productInAPI, req.query).advanceFilter().sortBy().searchBy().pagination();
            const finalResult = await result.product;
            res.json({success: true, products: finalResult});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    },
    // getProductByCondition: async (req, res) => {//console.log(req.query)
    //     try {
    //         const productInAPI = await Product.find().populate('category');
    //         const result = new HandleResult(productInAPI, req.query).searchBy().pagination();
    //         const finalResult = await result.product;
    //         res.json({success: true, products: finalResult});
    //     } catch (error) {
    //         return res.status(500).json({success: false, message: error.message});
    //     }
    // },
    getProductDetail: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate('category');
            return res.json({success: true, product});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    },
    createProduct: async (req, res) => {
        const {productID, productName, productInfo, productImage,
            productOption, productPrice,
            category} = req.body;
        
        //Simple check
        if(!productID || !productName || !productImage.mainImage.url || !category || !productPrice.normalPrice) 
        return res.json({success: false, message: "Vui l??ng nh???p ?????y ????? c??c tr?????ng"})
        
        try {
            //check for existing product
            const product = await Product.findOne({productID});
            if(product) return res.json({success: false, message: "S???n ph???m ???? t???n t???i, m???i b???n nh???p s???n ph???m kh??c"})
            
            //all good
            //console.log(req.body);
            const newProduct = new Product({
                productID,
                productName,
                productInfo: {
                    title: productInfo.title,
                    description: productInfo.description,
                    video: productInfo.video
                },
                productImage: {
                    mainImage: productImage.mainImage,
                    galleryImage: productImage.galleryImage
                },
                productOption: {
                    color: productOption.color,
                    size: productOption.size
                },
                productPrice: {
                    normalPrice: productPrice.normalPrice,
                    discountPrice: productPrice.discountPrice
                },
                category
            })
            await newProduct.save();
            const resProduct = await Product.findOne({productID}).populate('category');
            res.json({success: true, message: 'Th??m s???n ph???m th??nh c??ng', product: resProduct});
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: "Internal Server Error"})
        }
    },
    updateProduct: async (req, res) => {
        const {productID, productName, productInfo, productImage,
            productOption, productPrice, flashsaleType,
            category} = req.body;
        //Simple check
        if(!productID || !productName) return res.json({success: false, message: "Vui l??ng nh???p ?????y ????? c??c tr?????ng"})
        
        try {
            await Product.findOneAndUpdate({_id: req.params.id}, {
                productID,
                productName,
                productInfo: {
                    title: productInfo.title,
                    description: productInfo.description,
                    video: productInfo.video
                },
                productImage: {
                    mainImage: productImage.mainImage,
                    galleryImage: productImage.galleryImage
                },
                productOption: {
                    color: productOption.color,
                    size: productOption.size
                },
                productPrice: {
                    normalPrice: productPrice.normalPrice,
                    discountPrice: productPrice.discountPrice
                },
                flashsaleType: {
                    flashStatus: flashsaleType.flashStatus,
                    flashTypeArr: flashsaleType.flashTypeArr
                },
                category
            })
            const resProduct = await Product.findOne({productID}).populate('category');
            res.json({success: true, message: "C???p nh???t th??nh c??ng s???n ph???m", updatePr: resProduct})
        } catch (error) {
            return res.status(500).json({success: false, message: "C?? l???i x???y ra, xin h??y th??? l???i"})
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.json({success: true, message: "???? x??a th??nh c??ng s???n ph???m"})
        } catch (error) {
            return res.status(500).json({success: false, message: "C?? l???i x???y ra, xin h??y th??? l???i"})
        }
    }
}

module.exports = ProductCtrl