const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');


const messageCtrl = {
    createMessage: async (req, res) => {
        try {
            const {sender, recipient, content} = req.body;

            if(!recipient) return;
            const newConversation = await Conversation.findOneAndUpdate({
                $or: [
                    {recipients: [sender, recipient]},
                    {recipients: [recipient, sender]}
                ]
            }, {
                recipients: [sender, recipient], content: ''
            }, {new: true, upsert: true})
            
            const newMessage = new Message({
                conversation: newConversation._id,
                sender,
                recipient,
                content
            })

            await newMessage.save();
            res.json({success: true, resConversation: {recipient, conversationID: newConversation._id}});
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getMessages: async (req, res) => {
        try {
            const messages = await Message.find({
                $or: [
                    {sender: req.user.id, recipient: req.params.id},
                    {sender: req.params.id, recipient: req.user.id}
                ]
            }).sort('createdAt').populate('sender', 'loginName userName userAvatar');

            res.json({
                success: true,
                messages,
                result: messages.length
            })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getConversations: async (req, res) => {
        try {
            const conversations = await Conversation.find({
                recipients: req.user.id
            }).sort('-updatedAt').populate('recipients', 'loginName userName userAvatar');

            res.json({
                success: true,
                conversations,
                result: conversations.length
            })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = messageCtrl