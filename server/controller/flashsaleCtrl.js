const Flashsale = require('../models/flashsaleModel');

const flashsaleCtrl = {
    getFlashsale: async (req, res) =>{
        try {
            const flashsale = await Flashsale.find();
            res.json({success: true, flashsale})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    },
    createFlashsale: async (req, res) => {
        const {countdown} = req.body;
    
        //simple check data
        if(!countdown)
            return res.json({success: false, message: 'Vui lòng nhập đầy đủ các trường'})
        try {
            const newCountdown = new Flashsale({countdown})
            await newCountdown.save();
    
            res.json({success: true, message: "Thêm thành công"})
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: "Server tạm thời bị lỗi, vui lòng thử lại sau"})
        }
    },
    updateFlashsale: async (req, res) => {
        //check
        const {countdown} = req.body;
        if(!countdown) return res.json({success: false, message: "Vui lòng nhập đầy đủ các trường"})
        //It is ok
        try {
            const updatedFlash = await Flashsale.findOneAndUpdate(
                {_id: req.params.id}, 
                {countdown}, 
                { new: true } //dùng để lưu lại cập nhật khi xuất ra updatedCate, nếu k có thì updateCate sẽ xuất ra giá trị trong csdl
            );

            if(!updatedFlash) return res.status(401).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
            res.json({success: true, message: "Cập nhật thành công", updatedFlash})
        } catch (error) {
            return res.status(500).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    }
}

module.exports = flashsaleCtrl