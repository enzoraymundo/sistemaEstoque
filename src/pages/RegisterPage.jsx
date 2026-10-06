import Header from '../components/Header'
import Register from '../components/Register'

function RegisterPage(){
    return(
        <div className='pagina'>
             <Header />
             <main className='pagina-conteudo'>
                <Register />
             </main>
        </div>
    )
}

export default RegisterPage