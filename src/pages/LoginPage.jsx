import Header from "../components/Header";
import Login from "../components/Login";

function LoginPage(){
    return(
        <div className="pagina">
            <Header />
            <main className="pagina-conteudo">
                <Login />
            </main>
        </div>
    )
}

export default LoginPage