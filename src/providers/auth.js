import React, { useState } from "react";

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState("")
    const [habitos, setHabitos] = useState([])
    
  
    return(
        <AuthContext.Provider value={{user, setUser, habitos, setHabitos}}>
            {props.children}
        </AuthContext.Provider>
    )
}