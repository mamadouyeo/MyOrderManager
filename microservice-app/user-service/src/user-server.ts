import express from 'express'
import ddotenv from 'dotenv'
const port = 5000
const app = express()
app.use(express.json());
app.use('api/user-service', ()=> {
    return 'bonjour typescript'
}
)


//lecture sur le port 5001
app.listen(port, ()=> {
    console.log("le service user est lancé sur le port " + port);
    
})