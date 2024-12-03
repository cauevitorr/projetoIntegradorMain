import express from 'express'
import cors from 'cors'


import conn from './config/conn.js'

// Models
import './model/funcionarioModel.js'
import './model/colaboradorModel.js'


//Rotas
import funcionarioRouter from "./router/funcionarioRouter.js"
import colaboradorRouter from "./router/colaboradorRouter.js"
import userRouter from "./router/userRoutes.js"

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

conn.sync().then(() => {
    console.log("Conectado")
}).catch((err) => console.error(err))

app.use("/api", funcionarioRouter)
app.use("/api", colaboradorRouter)
app.use('/api/users', userRouter);

app.use((request, response) => {
    response.status(404).json({message: "Rota não encontrada"})
})

export default app;

