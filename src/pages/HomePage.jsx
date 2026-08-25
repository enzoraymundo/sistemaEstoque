import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { supabase } from "../lib/supabase";
import ListaProdutos from "../components/ListaProdutos";
import CriarProduto from "../components/CriarProduto";

function HomePage(){
    const navigate = useNavigate()

    async function sair(){
        await supabase.auth.signOut()
        navigate("/", {replace: true})
    }

    return(
        <>
        <Header />
        <button className="botao" onClick={sair}>Sair</button>
        <Hero titulo={"Sistema Cardsinova"} subtitulo={"O que você procura?"} textoBotao={"Procurar"}/>
        <ListaProdutos />
        <CriarProduto></CriarProduto>
    </>
    )
}

export default HomePage