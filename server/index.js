const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const User = require('./models/user')

const app = express();

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(express.static('public'));


mongoose.connect('mongodb+srv://saif:1234@nodeexpressproject.pihvdop.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProject').then(() => {
    console.log('Database connected');
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb-> callback
        cb(null,'public/image') //null == inplace or error
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
app.get('/getimage', (req, res) => {
    User.find({})
    .then((result) => {
       res.json(result)
    })
    .catch((err) => {
        console.log(err);
    })
})
app.post('/upload',upload.single('file'), (req, res) => {
    User.create({image:req.file.filename}).then((reult) => {
        res.json(reult)
    }).catch((err) => {
        console.log(err);
    })
})
app.listen(6001, () => {
    console.log('Server is running on port 6001');
})