const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ColorBoxSchema = new Schema({
    title: {
        type: String
    },
    stock: {
        type: String
    }
})
const SizeBoxSchema = new Schema({
    title: {
        type: String
    },
    extra: {
        type: String
    }
})
const GalleryBoxSchema = new Schema({
    public_id: {
        type: String
    },
    url: {
        type: String
    }
})
const FlashTypeArrSchema = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }
})
const ProductSchema = new Schema({
    productID: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        require: true
    },
    productInfo:{
        title: {
            type: String,
            default: "Chưa cập nhật"
        },
        description: {
            type: String,
            default: "Chưa cập nhật"
        },
        video: {
            type: String,
            default: ""
        }
    }, 
    productImage: {
        mainImage: {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        },
        galleryImage: [GalleryBoxSchema]
    },
    productOption: {
        color: [ColorBoxSchema],
        size: [SizeBoxSchema]
    },
    productPrice:{
        normalPrice: {
            type: Number
        },
        discountPrice: {
            type: Number
        }
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'categorys'
    },
    flashsaleType:{
        flashStatus: {
            type: Boolean,
            default: false
        },
        flashTypeArr: [FlashTypeArrSchema]
    },
    ratingStar: {
        type: Number,
        default: 5
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('products', ProductSchema)