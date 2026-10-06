import "./style/Hero.css"

function Hero({titulo, subtitulo, textoBotao}){
    return(
        <section className="hero">
            <h1>{titulo}</h1>
            <p>{subtitulo}</p>
            <button className="hero-botao">{textoBotao}</button>
        </section>
    )
}

export default Hero