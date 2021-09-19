const Review = require('./../models/reviewModel');

const ReviewCtrl = {
    getReviews: async (req, res) => {
        try {
            const productID = req.params.id;
            const reviews = await Review.find({productID});
            return res.json({success: true, reviews});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    },
    createReview: async (req, res) => {
        const {reviewContent, reviewName, reviewPhone,
            reviewImage, reviewStar, productID
        } = req.body;
        if(!reviewName || !reviewPhone || !reviewContent) return res.json({success: false, message: "Vui lòng nhập đầy đủ thông tin các trường"})
 
        try {
            const newReview = new Review({
                reviewContent,
                reviewName,
                reviewPhone,
                reviewImage,
                reviewStar,
                productID
            })
            await newReview.save();
            const resReviews = await Review.find({productID});
            return res.json({success: true, message: "Đã thêm thành công nhận xét", reviews: resReviews});
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
}

module.exports = ReviewCtrl;