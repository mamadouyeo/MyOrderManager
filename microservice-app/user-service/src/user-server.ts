import express from 'express'
import {mongooseHelper} from './config/db/mongoseHelper'
import userRouter from './router/routerPost'

const port = 5000
const app = express()
app.use(express.json());
app.use(userRouter)



//lecture sur le port 5001
app.listen(port, ()=> {
    console.log("le service user est lancé sur le port " + port)
    mongooseHelper.getInstance()
    
})