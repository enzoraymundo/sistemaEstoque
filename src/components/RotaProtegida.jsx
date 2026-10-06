import { useEffect } from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

function RotaProtegida({children}){
    const [session, setSession] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function rota(){ 

                const data = localStorage.getItem('token') 
                setSession(data)
                setCarregando(false)
        }
        rota()
    }, [])

        if(carregando){ return <p>Carregando...</p> }
        if(!session) { return <Navigate to={"/"} replace/> }
        return children
}

export default RotaProtegida