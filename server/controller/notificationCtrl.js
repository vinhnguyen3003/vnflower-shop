const Notification = require('./../models/notificationModel');

const NotificationCtrl = {
    createNoti: async (req, res) => {
        const {notiContent, customerName} = req.body;

        if(!notiContent || !customerName) 
        return res.json({success: false, message: 'Chưa đầy đủ thông tin yêu cầu'})

        try {
            const newNoti = new Notification({
                notiContent,
                customerName,
                createAt: Date.now()
            })
            await newNoti.save();
            const resNoti = await Notification.find().sort('-createAt');
            return res.json({success: true, notifications: resNoti})
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },
    getNoti: async (req, res) => {
        try {
            const notifications = await Notification.find().sort('-createAt');
            return res.json({success: true, notifications});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateNoti: async (req, res) => {
        try {
            await Notification.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            })
            const resNoti = await Notification.findOne({_id: req.params.id});
            res.json({success: true, updateNotification: resNoti})
        } catch (error) {
            return res.status(500).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    },
    deleteNoti: async (req, res) => {
        try {
            await Notification.findByIdAndDelete(req.params.id);
            res.json({success: true, message: "Đã xóa thành công thông báo"})
        } catch (error) {
            return res.status(500).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    }
}

module.exports = NotificationCtrl