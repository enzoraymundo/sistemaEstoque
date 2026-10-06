import { Link } from "react-router-dom"
import "./style/Header.css"

function Header(){
    return(
        <header className="header">
            <span className="header-marca">CardsInova</span>
            <Link className="header-botao" to={"/home"}>Entrar em contato</Link>
        </header>
    )
}

export default Header