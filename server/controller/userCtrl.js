const argon2 = require('argon2');

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const createToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    return {accessToken, refreshToken};
}
const updateRefreshToken = async (loginName, refreshToken) => {
    try {
        await User.findOneAndUpdate({loginName}, {refreshToken});
    } catch (error) {
        console.log(error)
    }
}
const userCtrl = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if(!user) return res.json({success: false, message: "Không tìm thấy tên đăng nhập"})
            res.json({success: true, user})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
    },
    register: async (req, res) =>{
        const {loginName, password, userName} = req.body;
    
        if(!loginName || !password || !userName)
            return res.status(400).json({success: false, message: "Vui lòng điền đầy đủ thông tin các trường"})
        try {
            //check for existing acccount in db
            const user = await User.findOne({loginName});
            if(user) return res.status(400).json({success: false, message: "Tên đăng nhập đã tồn tại, mời bạn nhập cái khác"})
            
            //all good
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({loginName, password: hashedPassword, userName, userRole: 1});
            await newUser.save();
            
            //return token
            //const token = createToken({id: user._id});
            res.json({success: true, message: "Đăng kí thành công"})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
    },
    login: async (req, res)=>{
        const {loginName, password} = req.body;
        if(!loginName || !password)
            return res.status(400).json({success: false, message: "Vui lòng điền đầy đủ thông tin yêu cầu"})
        try {
            //check for existing loginName
            const user = await User.findOne({loginName});
            if(!user) return res.status(400).json({success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác"})
            //check for existing password
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) return res.status(400).json({success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác"})
            //all good
            const tokens = createToken({id: user._id});
            updateRefreshToken(loginName, tokens.refreshToken);
            res.json({success: true, message: "Đăng nhập thành công", accessToken: tokens.accessToken});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }   
    },
    loginWith: async (req, res) => {
        const {loginName, userName, userAvatar} = req.body;
        if(!loginName) return res.status(400).json({success: false, message: "Chưa có thông tin yêu cầu"})
        
        try {
            //check for existing loginName
            const user = await User.findOne({loginName});
            var tokens = {}
            if(!user) {
                const newUser = new User({
                    loginName, 
                    password: 'Login With Google', 
                    userName, 
                    userAvatar,
                    userRole: 0
                });
                await newUser.save();
                tokens = createToken({id: newUser._id});
                updateRefreshToken(loginName, tokens.refreshToken);
            }else{
                tokens = createToken({id: user._id});
                updateRefreshToken(loginName, tokens.refreshToken);
            }
            res.json({success: true, message: "Đăng nhập thành công", accessToken: tokens.accessToken});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
    },
    putRefreshToken: async (req, res) => {
        const {refreshToken} = req.body;
        if(!refreshToken) return res.status(401).json({success: false, message: "Please Login or Register"});

        const user = await User.findOne({refreshToken});
        if(!user) return res.status(403).json({success: false, message: "RefreshToken Wrong"});

        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const tokens = createToken({id: user._id});
            updateRefreshToken(user.loginName, tokens.refreshToken);
            res.json({success: true, tokens});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Có lỗi xảy ra, xin hãy thử lại"})
        }
    },
    logout: async (req, res) => {
        try {
            await User.findByIdAndUpdate({_id: req.user.id}, {refreshToken: null});
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
}

module.exports = userCtrl