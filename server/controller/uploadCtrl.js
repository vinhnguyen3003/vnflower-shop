const cloudinary = require('cloudinary');
const fs = require('fs');

//Set up config for cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadCtrl = {
    upload: (req, res) => {
        try {
            
            if(!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({success: false, message: "Không có file nào được chọn để tải lên"})
            const file = req.files.file;//fileName is define in frontend when submit

            if(file.size > 1024 * 1024){
                removeTmp(file.tempFilePath);
                return res.status(400).json({success: false, message: "Kích thước file quá lớn, không thể tải lên được"})       
            }
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
                removeTmp(file.tempFilePath);
                return res.status(400).json({success: false, message: "Định dạng file không hợp lệ"});
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "FlowerWebsite" }, (err, result) => {
                if(err) throw err;

                removeTmp(file.tempFilePath)

                res.json({public_id: result.public_id, url: result.secure_url})
            })

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    destroy: async (req, res) => {
        try {
            const {public_id} = req.body;
            if(!public_id) return res.status(400).json({success: false, message: "Không có file nào được chọn"})
            
            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if(err) throw err;

                res.json({success: true, message: "Đã xóa file thành công"})
            })
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})       
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = uploadCtrl