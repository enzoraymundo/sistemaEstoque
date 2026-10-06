export function showInfo(req, res, next){
    const data = new Date()

    const time = data.toLocaleTimeString("pt-br") 

    console.log(time + " " + req.method + " " + req.originalUrl)

    next()
}