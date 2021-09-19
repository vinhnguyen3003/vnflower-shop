

const SocketServer = (socket) => {
    //connect-disconnect
    socket.on('disconnect', ()=>{
        console.log(socket.id + ': disconnected')
    })
    //create order
    socket.on('createOrder', order => {
        socket.emit('createOrderInAdmin', order)
    })
}
module.exports = SocketServer