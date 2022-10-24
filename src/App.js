import { BrowserRouter, Route, Routes} from "react-router-dom";
import Cadastro from "./Cadastro";
import GlobalStyle from "./GlobalStyle";
import Hoje from "./Hoje";
import Login from "./Login";
import React, { useState } from "react";
import { AuthContext } from "./providers/auth";
import Habitos from "./Habitos";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const {user, setUser} = React.useContext(AuthContext)
  const {habitos, setHabitos} = React.useContext(AuthContext)
  const {porcentagem, setPorcentagem} = React.useContext(AuthContext)
console.log('aaaaaaaaaaaaa', habitos[0])


let habitosConcluidos = habitos.filter((h) => h.done === true)
let progressao = (habitosConcluidos.length/habitos.length)* 100

console.log(progressao)

  function listarHabitos(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIwMiwiaWF0IjoxNjY2Mzc2OTUxfQ.NadZNeS7do4gIWNmw0r-OtN5qsDZ_0VZORH0K6xku7g"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    const promise = axios.get(URL, config)

    promise.then((res) => {
        setHabitos(res.data)
    })
    promise.catch((err) => {
        console.log(err.response.data)
    })
}

useEffect(() => {
    listarHabitos()}, [])

  
  console.log(habitos)
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
      <Route path="/" element={<Login setUser={setUser}/>}/>
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/habitos" element={<Habitos progressao={progressao}/>}/>
      <Route path="/hoje" element={<Hoje  progressao={progressao} listarHabitos={listarHabitos}/>}/>
      </Routes>
    </BrowserRouter>


  )
}

export default App;
