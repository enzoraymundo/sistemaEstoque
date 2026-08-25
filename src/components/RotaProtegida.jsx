import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useState } from "react"
import { Navigate } from "react-router-dom"

function RotaProtegida({children}){
    const [session, setSession] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function rota(){ 

                const { data } = await supabase.auth.getSession()
                setSession(data.session)
                setCarregando(false)
        }
        rota()
    }, [])

        if(carregando){ return <p>Carregando...</p>}
        if(!session) { return <Navigate to={"/"} replace/>}
        return children
}

export default RotaProtegida