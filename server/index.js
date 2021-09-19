const express = require('express');
const db = require('./config/db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const SocketServer = require('./socketServer');

const cateRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');
const flashsaleRouter = require('./routes/flashsaleRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const orderRouter = require('./routes/orderRouter');
const notificationRouter = require('./routes/notificationRouter');
const messageRouter = require('./routes/messageRouter');
const uploadRouter = require('./routes/uploadRouter');

//Connect Express
const app = express();
//Define app use json
app.use(express.json());
//Define app use file upload
app.use(fileUpload({
    useTempFiles: true
}))
//Define cors to orther domain access
app.use(cors());
//Connect Mongodb
db.connect();

//Define api of category
app.use('/api/category', cateRouter)
//Define api of product
app.use('/api/product', productRouter)
//Define api of product
app.use('/api/flashsale', flashsaleRouter)
//Define api of user
app.use('/api/admin', userRouter)
//Define api of review
app.use('/api/review', reviewRouter)
//Define api of order
app.use('/api/order', orderRouter)
//Define api of notification
app.use('/api/notification', notificationRouter)
//Define api of message
app.use('/api/messageUrl', messageRouter)
//Define api of upload function
app.use('/api', uploadRouter)

//Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*'
    }
});

var users = [];
io.on('connection', socket => {
    console.log("Connect Successfully !!!");
  
    //SocketServer(socket)
    socket.on('disconnect', ()=>{
        console.log(socket.id + ': disconnected')
    })
    //create order
    socket.on('createOrder', order => {
        //console.log(order.length)
        io.sockets.emit('createOrderInAdmin', order)
    })
    //create notification
    socket.on('createNoti', noti => {
        io.sockets.emit('createNotiInAdmin', noti)
    })
    //set flashsale countdown
    socket.on('setCountdown', countdown => {
        io.sockets.emit('getCountdown', countdown)
    })
    //set join user
    socket.on('joinUser', user => {
        let index = users.findIndex(u => u.id === user._id);
        if(index !== -1){
            users[index] = {id: user._id, socketID: socket.id}
        }else{
            users.push({id: user._id, socketID: socket.id})
        }
        console.log(users)
    })
    //set message
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketID}`).emit('addMessageToRecipient', msg)
    })
    //set conversation notification
    socket.on('addConverNoti', data => {
        const user = users.find(user => user.id === data.recipient)
        user && socket.to(`${user.socketID}`).emit('addConverNotiToRecipient', data)
    })
})

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`))