const Order = require('./../models/orderModel');


const OrderCtrl = {
    createOrder: async (req, res) => {
        const {sex, customerName, customerPhone, customerAddress,
        customerRequest, deliveryMethod, cartInfo, totalAll} = req.body;

        if(!customerName || !customerPhone || !customerAddress)
            return res.json({success: false, message: 'Vui lòng nhập đầy đủ các trường'})
        
        try {
            const newOrder = new Order({
                sex,
                customerName,
                customerPhone,
                customerAddress,
                customerRequest,
                deliveryMethod, 
                cartInfo,
                totalAll: {
                    itemCount: totalAll.itemCount,
                    totalPrice: totalAll.totalPrice
                },
                createAt: Date.now()
            })
            await newOrder.save();
            const resOrders = await Order.find().sort('-createAt');
            return res.json({success: true, message: 'Đã đặt hàng thành công', orders: resOrders})
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal Server Error'});
        }
    },
    getOrder: async (req, res) => {
        try {
            const orders = await Order.find().sort('-createAt');
            return res.json({success: true, orders});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateOrder: async (req, res) => {
        const {orderNote, orderStatus} = req.body;
        try {
            await Order.findOneAndUpdate({_id: req.params.id}, {
                orderNote,
                orderStatus
            })
            const resOrder = await Order.findOne({_id: req.params.id});
            res.json({success: true, message: "Cập nhật thành công đơn hàng", updateOrder: resOrder})
        } catch (error) {
            return res.status(500).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    },
    deleteOrder: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.json({success: true, message: "Đã xóa thành công đơn hàng"})
        } catch (error) {
            return res.status(500).json({success: false, message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    }
} 

module.exports = OrderCtrl;