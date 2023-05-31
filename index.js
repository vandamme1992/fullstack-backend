import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import {registerValidation, loginValidation, postCreateValidation} from './validations.js'
import {getMe, getAll, getOne, login, register, create, remove, update} from "./controllers/index.js";
import {checkAuth, handleValidationErrors} from "./utils/index.js";


mongoose
    .connect('mongodb+srv://maxim:maxim@cluster1.00jvuph.mongodb.net/blog')
    .then(() => {
        console.log('DB OK')
    })
    .catch(err => {
        console.log('DB error', err)
    })

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})


const upload = multer({storage})

app.use(express.json())

//get запрос на получение статичного файла
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)


//foto
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, create)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, update)


app.listen(4444, err => {
    if (err) {
        return console.log(err)
    }
    console.log('server OK!')
})
