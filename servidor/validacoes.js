export function validarTexto(valor){
    if(typeof valor != "string"){
        return "Não é um texto"
    }

    if(valor.trim().length == 0){
        return "Campo obrigatório"
    }

    if(valor.length > 100){
        return "Acima de 100 caractéres"
    }

    return null
}

export function validarNumero(valor){
    if(typeof valor != "number"){
        return "Não é um número"
    }

    if(Number.isInteger(valor) == false){
        return "O número precisa ser inteiro"
    }

    if(valor < 0){
        return "O número não pode ser menor que zero"
    }

    return null
}