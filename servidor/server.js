import express from "express"
import cors from "cors"
import rotaProduto from "./produtos.js"
import rotaAuth from "./auth.js"
import { showInfo } from "./middlewares/showInfo.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(showInfo)

app.use("/produtos", rotaProduto)
app.use(rotaAuth)

app.listen(3000)