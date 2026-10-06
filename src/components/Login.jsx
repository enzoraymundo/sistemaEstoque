import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setErro('')
    setCarregando(true)
    
    try{
      const resultado = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      })

      const token = await resultado.json()
      localStorage.setItem('token', token.jwt)
      
      if(!resultado.ok){
        setErro(resultado.statusText)
        setCarregando(false)
        return
      }
      
    } catch(erro){
      setErro(erro)
      setCarregando(false)
      return
    }
    
    setCarregando(false)
    navigate("/home", {replace: true})
  }
  
  return (
      <form onSubmit={handleSubmit} className='card-form'>
        <h2>Login</h2>
        <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)}/>
        {erro && <p className='erro'>{erro}</p>}
        <Link className='botao' to={"/register"}>Cadastrar</Link>
        <button className='botao-secundario' type="submit" disabled={carregando}>{carregando ? "Carregando..." : "Entrar"}</button>
      </form>
  )
}

export default Login