import React, { useState } from "react";

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState("")
    const [habitos, setHabitos] = useState([])
    const [porcentagem, setPorcentagem] = useState("")
    
  
    return(
        <AuthContext.Provider value={{user, setUser, habitos, setHabitos, porcentagem, setPorcentagem}}>
            {props.children}
        </AuthContext.Provider>
    )
}