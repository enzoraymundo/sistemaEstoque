import { useState } from "react"
import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import './style/ListaProdutos.css'

function ListaProdutos(){
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        async function buscarProduto(){
            const { data, error } = await supabase.from('produtos').select('*')
            if(error){
                console.log(error)
                return
            }
            setProdutos(data)
        }
        buscarProduto()
    }, [])

    return(
        <>
           <section className="lista-produtos">
                <ul className="produtos-lista">
                    {produtos.map((produto) => (
                        <li key={produto.id} className="produto-item">
                            <span className="produto-nome">{produto.nome}</span>
                            <span className="produto-quantidade">{produto.quantidade}</span>
                        </li>
                    ))}
                </ul>
           </section>
        </>
    )
}

export default ListaProdutos