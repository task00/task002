import  express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import multer from "multer";
import path from "path";
import  UserModel  from "./models/UserModel.js";
import PostModel from "./models/PostModel.js";




const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))

app.use(cookieParser())
app.use(express.static("Public"))

mongoose.connect('mongodb://127.0.0.1:27017/blog');


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("The token is missing")
    }else{
        jwt.verify(token, 'jwt-secret-key', (err,decoded) => {
            if(err) {
                return res.json("The token is wrong")
            } else {
                req.email= decoded.email;
                req.username= decoded.username;
                next()
            }
        })
    }
}


app.get('/', verifyUser, (req,res) => {
    return res.json({email:req.email, username:req.username})
})


app.post('/register', (req,res)=>{
  const {username, email, password} = req.body 
  bcrypt.hash(password, 10)
  .then(hash => {
    UserModel.create({username, email, password: hash})
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
  }).catch(err => console.log(err))
 
})

app.post("/login", (req,res) => {
    const {email , password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response){
                    const token = jwt.sign({email: user.email, username: user.username},
                      "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token)  
                    return res.json("Success")
                }else{
                    return res.json('password is incorrect')
                }
            })
        }else{
           return res.json("user not exist")
        }
    })
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images")
    },
    filename: (req, file ,cb)=> {
        cb (null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer ({
    storage: storage
})

app.post("/create", verifyUser, upload.single('file'), (req,res)=> {
 PostModel.create({
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename,
    email: req.body.email})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
})

app.get('/getposts', (req , res)=> {
    PostModel.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

app.get('/getpostbyid/:id', (req, res) => {
    const id = req.params.id
    PostModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.put('/editpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate (
        {_id: id}, 
        {title: req.body.title,
         desc:req.body.desc}
        )
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
})

app.delete("/deletepost/:id" , (req, res)=> {
    PostModel.findOneAndDelete({_id: req.params.id})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
})

app.get('/logout', (req,res) => {
    res.clearCookie("token");
    return res.json("Success")
})

app.listen(8081, ()=>{
    console.log("Server is Running")
})