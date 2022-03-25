const express = require('express'); 
const app = express();
const db = require('./db/database')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Router
const postRouter = require('./router/PostRouter')
const router = require('./router/UserRouter')
app.use('/', router)
app.use('/post',postRouter)


const PORT = 4000
app.listen(PORT,()=> [
    console.log('benning running')
])