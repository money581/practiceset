const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function isStringInvalid(string) {
    return string === undefined || string.length === 0;
}

exports.signup = async (req, res, next) => {
    try {
        const { name, email, phonenumber, password } = req.body;
        if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phonenumber) || isStringInvalid(password)) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(401).json({ message: 'User already exists with this email address' });
        }
        await User.create({ name, email, phonenumber, password: hash });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const generateToken = (id, name) => {
    return jwt.sign({ userid: id, name: name }, process.env.TOKEN_SECRET);
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ where: { email } });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({ message: "Something went wrong" });
                } else if (result === true) {
                    res.status(201).json({
                        success: true,
                        message: "User logged in successfully",
                        token: generateToken(user.id, user.name),
                    });
                } else {
                    res.status(401).json({ success: false, message: "Incorrect password" });
                }
            });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
};
exports.getuser= async(req,res,next)=>{
    try{
       const signupuser=await User.findAll()
       res.status(201).json({message: 'Succesfully signup',users:signupuser});
    }
    catch(err){
       res.status(500).json({error: err})
    }
  }