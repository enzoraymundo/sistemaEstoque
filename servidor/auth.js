import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import { pool } from "./db.js"
import { validarTexto } from "./validacoes.js"

const router = express.Router()

router.post("/usuarios", async (req, res) =>{
    const email = req.body?.email
    const senha = req.body?.senha

    const validarEmail = validarTexto(email)
    const validarSenha = validarTexto(senha)

    if(validarEmail){ return res.status(400).json({erro: validarEmail})}
    if(validarSenha){ return res.status(400).json({erro: validarSenha})}

    try {
        const hash = await bcrypt.hash(senha, 10)

        const resultado = await pool.query("INSERT INTO usuarios(email, senha_hash) VALUES ($1, $2)", [email, hash])

        console.log(resultado)
        res.status(204).json({resultado: "Usuário cadastrado"})

    } catch(erro){
        if(erro.code == 23505){
            res.status(409).json({erro: "Esse Email já foi cadastrado"})
        }
        console.log(erro.message)
        res.status(500).json({erro: "Erro do servidor"})
    }
})

router.post("/login", async (req, res)=>{
    const email = req.body?.email
    const senha = req.body?.senha

    const validarEmail = validarTexto(email)
    const validarSenha = validarTexto(senha)

    if(validarEmail){ return res.status(400).json({erro: validarEmail})}
    if(validarSenha){ return res.status(400).json({erro: validarSenha})}

    try {
        const resultado = await pool.query("SELECT id, senha_hash FROM usuarios WHERE email=$1", [email])
        const usuario = resultado.rows[0]

        if(!usuario){
            return res.status(401).json({erro: "Email ou senha inválidos"})
        }
        
        const verificacao = await bcrypt.compare(senha, usuario.senha_hash)

        if(verificacao == false){
            res.status(401).json({erro: "Senha incorreta"})
            return
        }

        const token = jwt.sign({sub: usuario.id}, process.env.JWT_SECRET, {expiresIn: 3600})
        res.status(200).json({jwt: token})

    } catch(erro){
        console.log(erro.message)
        res.status(500).json({erro: "Erro do servidor"})
    }
})

export default router
