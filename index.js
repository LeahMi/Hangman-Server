import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import router from './routes/gameRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use("/game", router);

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})