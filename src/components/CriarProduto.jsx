import { supabase } from "../lib/supabase"
import { useState } from "react"

function CriarProduto(){
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        const { data } = await supabase.auth.getUser()

        const { error } = await supabase.from('produtos').insert({
            user_id: data.user.id,
            nome: nome,
            quantidade: Number(quantidade)
        })

        if(error){
            console.log(error)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={nome} onChange={(e) => (setNome(e.target.value))}/>
            <input type="number" value={quantidade} onChange={(e) => (setQuantidade(e.target.value))}/>
            <button type="submit"></button>
        </form>
        </>
    )
}

export default CriarProduto