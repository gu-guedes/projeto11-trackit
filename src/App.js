import { BrowserRouter, Route, Routes} from "react-router-dom";
import Cadastro from "./Cadastro";
import GlobalStyle from "./GlobalStyle";
import Hoje from "./Habitos";
import Login from "./Login";
import React, { useState } from "react";
import { AuthContext } from "./providers/auth";
import Habitos from "./Habitos";

function App() {
  const {user, setUser} = React.useContext(AuthContext)
  const {habitos, setHabitos} = React.useContext(AuthContext)
  console.log(habitos)
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
      <Route path="/" element={<Login setUser={setUser}/>}/>
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/habitos" element={<Habitos setHabitos={setHabitos}/>}/>
      </Routes>
    </BrowserRouter>


  )
}

export default App;
