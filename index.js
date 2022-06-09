const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const fileUpLoad = require('express-fileupload');
const fileRouter = require('./routes/file.routes');
// const corsMiddleware = require('./middleware/cors.middleware');
const cors = require('cors');
const filePathMiddleware = require('./middleware/filePath.middleware');
const path = require('path');

const app = express()
const PORT = process.env.PORT || config.get('serverPort')

app.use(filePathMiddleware(path.resolve(__dirname, 'file')))
app.use(fileUpLoad([]))
app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)


const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} PORT` )
        })
    }
    catch (e) {
        console.log(e)
    }

}
start ()