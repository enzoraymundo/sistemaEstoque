import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CriarProduto from "../components/CriarProduto";
import { useEffect, useState } from "react";
import "../components/style/HomePage.css"

function HomePage(){
    const navigate = useNavigate()
    const [produtos, setProdutos] = useState([])

    async function buscarProduto(){
        const token = localStorage.getItem('token')

        try{
            const data = await fetch("http://localhost:3000/produtos", {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
                "Authorization": token
            }
        })

        const produtos = await data.json()
        setProdutos(produtos) 

        } catch(erro){
            console.log(erro)
        }
    }

    async function apagarProduto(params){
        const token = localStorage.getItem('token')


        try{
            await fetch(`http://localhost:3000/produtos/${params}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                }
            })
            
            buscarProduto()
        } catch(erro){
            console.log(erro)
        }
    }
    
    async function atualizarProduto(produto, quantidade){
        const token = localStorage.getItem('token')

        try{
            const data = await fetch("http://localhost:3000/produtos", {
                method: "PATCH",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    produto: produto,
                    quantidade: quantidade
                })
            })

            if(!data.ok){
                const error = await data.json()
                console.log(error)                
                
            }
            buscarProduto()

        } catch(erro){
            console.log(erro)
        }
    }

    async function sair(){
        localStorage.removeItem('token')
        navigate("/", {replace: true})
    }

    useEffect(() => {
        buscarProduto()
        
    }, [])

    return(
        <>
            <Header />

            <div className="pagina-home">

            <div className="home-topo">
                <button className="botao botao-sair" onClick={sair}>Sair</button>
            </div>

            <Hero titulo={"Sistema Cardsinova"} subtitulo={"O que você procura?"} textoBotao={"Procurar"}/>
            <section className="lista-produtos">
                    <ul className="produtos-lista">
                        {produtos.map((produto) => (
                            <li key={produto.id} className="produto-item">
                                <span className="produto-nome">{produto.nome}</span>

                                <div className="produto-controle">
                                    <button className="produto-passo" disabled={produto.quantidade === 0} onClick={() => atualizarProduto(produto.id, produto.quantidade - 1)}>−</button>

                                    <span className="produto-quantidade">{produto.quantidade}</span>

                                    <button className="produto-passo" onClick={() => atualizarProduto(produto.id, produto.quantidade + 1)}>+</button>
                                </div>

                                <button className="produto-apagar" aria-label="Apagar produto" onClick={() => apagarProduto(produto.id)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
            </section>
            <CriarProduto onCreate={buscarProduto}></CriarProduto>
        </div>
    </>
    )
}

export default HomePage