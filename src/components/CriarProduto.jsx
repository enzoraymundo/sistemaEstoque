import { useState } from "react"

function CriarProduto({onCreate}){
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [erro, setErro] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()
        setErro(null)

         if(quantidade <= 0){
            setErro('Quantidade não pode ser menor que ou igual a 0')
            return
        }

            const token = localStorage.getItem('token')

        try{
            await fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                nome: nome,
                quantidade: quantidade
            })
        })

        } catch(erro){
            setErro(erro)
            return
        }

        onCreate()
        
        setNome('')
        setQuantidade('')
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="form-produto">
            <input type="text" placeholder="Nome do produto" required value={nome} onChange={(e) => (setNome(e.target.value))}/>
            <input type="number" placeholder="Quantidade" required value={quantidade} onChange={(e) => (setQuantidade(e.target.value))}/>
            <button type="submit" className="botao">Adicionar</button>
            {erro && <p className="erro">{erro}</p>}
        </form>
        </>
    )
}

export default CriarProduto