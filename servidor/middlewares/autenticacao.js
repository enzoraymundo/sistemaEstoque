import jwt from "jsonwebtoken"

export function autenticar(req, res, next){
    const token = req.headers.authorization

    if(!token){
        res.status(401).json({erro: "Token não enviado"})
        return
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.sub

        next()
    } catch(erro){
        res.status(401).json({erro: erro.message})
    }   
}