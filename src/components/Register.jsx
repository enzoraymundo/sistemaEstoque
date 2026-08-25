import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from '../lib/supabase'

function Register(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()


    async function handleSubmit(e){
        e.preventDefault()
        
        if(senha !== confirmarSenha){
            setErro('Inválido')
            return
        }
        setErro('')
        setCarregando(true)
        const { error } = await supabase.auth.signUp({email, password: senha})

        if(error){
            setErro(error.message)
            setCarregando(false)
            return
        }

        setCarregando(false)
        navigate("/", {replace: true})
        
    }   

    return(
        <form onSubmit={handleSubmit} className="card-form">
            <h2>Cadastre-se</h2>
            <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Senha" value={senha} required onChange={(e) => setSenha(e.target.value)}/>
            <input type="password" placeholder="Confirme sua senha" value={confirmarSenha} required onChange={(e) => setConfirmarSenha(e.target.value)}/>
            {erro && <p className="erro">{erro}</p>}
            <button className="botao" type="submit" disabled={carregando}>{carregando ? "Carregando..." : "Cadastrar"}</button>
        </form>
    )
}

export default Register