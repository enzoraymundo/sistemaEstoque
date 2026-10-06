import express from "express"
import { pool } from "./db.js"
import { autenticar } from "./middlewares/autenticacao.js"
import { validarTexto, validarNumero } from "./validacoes.js"

const router = express.Router()

router.get("/", autenticar, async (req, res) => {
    try{
        const resultado = await pool.query("SELECT * FROM produtos WHERE user_id=$1", [req.userId])
        res.json(resultado.rows)

    } catch (erro){
        console.log(erro.message)
        res.status(500).json({erro: "Erro do servidor"})
    }
})

router.post("/", autenticar, async (req, res) => {
    const produto = req.body?.nome
    const quantidade = req.body?.quantidade
    const id = req.userId

    const validarNome = validarTexto(produto)
    if(validarNome){
        return res.status(400).json({erro: validarNome})
    }

    const validarQuantidade = validarNumero(quantidade)
    if(validarQuantidade){
        return res.status(400).json({erro: validarQuantidade})
    }

    try {
        await pool.query("INSERT INTO produtos(user_id, nome, quantidade) VALUES ($1, $2, $3)", [id, produto, quantidade])
        res.status(200).json({resultado: "Produto cadastrado"})

    } catch(erro){
        console.log(erro.message)
        res.status(500).json({erro: "Erro do servidor"})
    }
})

router.delete("/:id", autenticar, async (req, res) =>{
    const id = Number(req.params?.id)
    const validarId = validarNumero(id)
    if(validarId){ return res.status(400).json({erro: validarId}) }

    try{
        const resultado = await pool.query("DELETE FROM produtos where id=$1 AND user_id=$2", [id, req.userId] )
        
        if(resultado.rowCount == 0){
            res.status(404).json("Nenhum produto encontrado")
            return
        }
        
        res.status(200).json({resultado: "Produto apagado"})

    } catch(erro){
        console.log(erro.message)
        res.status(500).json({erro: "Erro do servidor"})
    }
    
})

router.patch("/:id", autenticar, async (req, res) => {
    const id = Number(req.params?.id)
    const quantidade = req.body?.quantidade

        const validarProduto = validarNumero(id)
        if(validarProduto){
            return res.status(400).json({erro: validarProduto})
        }

        const validarQuantidade = validarNumero(quantidade)
        if(validarQuantidade){
            return res.status(400).json({erro: validarQuantidade})
        }

    try {
        const resultado = await pool.query("UPDATE produtos SET quantidade=$1 WHERE id=$2 AND user_id=$3", [quantidade, id, req.userId])

        if(resultado.rowCount == 0){
            res.status(404).json({erro: "Nenhum produto alterado"})
            return
        }

        res.status(200).json({resultado: "Pedido alterado com sucesso"})

    } catch(erro){
        console.log(erro.message)
        res.status(500).json({erro: "Erro do servidor"})
    }
})

export default router