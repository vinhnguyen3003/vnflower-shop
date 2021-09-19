const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const categoryCtrl = {
    createCategory: async (req, res) => {
        const {categoryID, categoryName} = req.body;
    
        //simple check data
        if(!categoryID || !categoryName)
            return res.json({success: false, message: 'Vui lòng nhập đầy đủ các trường'})
        try {
            //Check for existing categogy
            const findCategoryID = await Category.findOne({categoryID});
            if(findCategoryID) return res.json({success: false, message: 'Mã danh mục đã tồn tại, mời bạn nhập tên khác'});
            const findCategoryName = await Category.findOne({categoryName})
            if(findCategoryName) return res.json({success: false, message: 'Tên danh mục đã tồn tại, mời bạn nhập tên khác'});
            //All good
            const newCategory = new Category({categoryID, categoryName})
            await newCategory.save();
    
            res.json({success: true, message: "Thêm danh mục thành công", category: newCategory})
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: "Server tạm thời bị lỗi, vui lòng thử lại sau"})
        }
    },
    getCategory: async (req, res) =>{
        try {
            const categories = await Category.find();
            res.json({success: true, categories})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    },
    updateCategory: async (req, res) => {
        //check
        const {categoryID, categoryName} = req.body;
        if(!categoryID || !categoryName) return res.json({success: false, message: "Vui lòng nhập đầy đủ các trường"})
        //It is ok
        try {
            const updatedCate = await Category.findOneAndUpdate(
                {_id: req.params.id}, 
                {categoryID, categoryName}, 
                { new: true } //dùng để lưu lại cập nhật khi xuất ra updatedCate, nếu k có thì updateCate sẽ xuất ra giá trị trong csdl
            );

            if(!updatedCate) return res.status(401).json({success: false, message: "Danh mục không tìm thấy hoặc không được ủy quyền"})
            res.json({success: true, message: "Cập nhật thành công danh mục sản phẩm", updatedCate})
        } catch (error) {
            return res.status(500).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Product.findOne({category: req.params.id});
            if(products) return res.status(400).json({
                success: false, message: "Vui lòng xóa các sản phẩm liên quan trước khi xóa danh mục này"
            })
            await Category.findByIdAndDelete(req.params.id);
            res.json({success: true, message: "Đã xóa thành công danh mục"})
        } catch (error) {
            return res.status(500).json({status: false, message: error.message})
        }
    }
}

module.exports = categoryCtrl