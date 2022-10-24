import styled from "styled-components"
import { AuthContext } from "./providers/auth"
import React from "react"
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import AddHabito from "./AddHabito"
import axios from "axios"
import { useState, useEffect } from "react"
import ListaHabitos from "./ListaHabitos"
import { Link } from "react-router-dom"
export default function Habitos(props) {
    const { user, habitos, setHabitos, porcentagem } = React.useContext(AuthContext)
    const [abrirFormulario, setAbrirFormulario] = useState(false)
    const [abrirLista, setAbrirLista] = useState(false)
    
    function adicionarHabito() {
        setAbrirFormulario(true)
    }

    return (
        <>
            <ContainerTopo>
                <p>TrackIt</p>
                <img data-identifier="avatar" src={user.image}></img>
            </ContainerTopo>
            <ContainerConteudo>
                <MeusHabitos>
                    <h1>Meus hábitos</h1>
                    <BotaoMais data-identifier="create-habit-btn" onClick={adicionarHabito}>
                        <ion-icon name="add-outline"></ion-icon>
                    </BotaoMais>
                </MeusHabitos>
                {abrirFormulario ? <AddHabito setAbrirFormulario={setAbrirFormulario} setAbrirLista={setAbrirLista} /> : <></>}
                {abrirLista || habitos.length > 0 ? <ListaHabitos /> : <></>}
                {habitos.length == 0 ? <SemHabito>
                    <p>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>

                </SemHabito> : <></>}

            </ContainerConteudo>
            <ContainerMenu>
                <p data-identifier="habit-page-action" >Hábitos </p>
                <div style={{ width: 91, height: 91, marginBottom: 30 }}>

                    <CircularProgressbarWithChildren
                        value={props.progressao}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}> <Link to="/hoje"><div style={{ fontSize: 18, marginTop: -10, color: "#fff", fontFamily: 'Lexend Deca' }}>Hoje</div></Link></CircularProgressbarWithChildren>
                </div>
                <p>Histórico</p>
            </ContainerMenu>
        </>
    )
}


const ContainerTopo = styled.div`
position: fixed;
top:0;
box-sizing: border-box;
padding: 10px 18px;
background-color: #126BA5;
width: 375px;
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);


p{
    font-family: 'Playball', cursive;
    font-size: 40px;
    color: white;
}
img{
    width: 50px;
    height: 50px;
    border-radius: 98px;
}
`
const ContainerMenu = styled.div`
box-sizing: border-box;
padding: 25px 35px;
width: 375px;
height: 70px;
background-color: white;
display: flex;
justify-content: space-between;
align-items: center;
bottom: 0;
position: fixed;
p{
    font-family: 'Lexend Deca', sans-serif;
    color: #52B6FF;
    font-size: 18px;

}
`
const ContainerConteudo = styled.div`
margin-top: 70px;
background-color: #F2F2F2;
width: 375px;
height: 100vh;
padding: 0px 18px;
box-sizing: border-box;
`
const MeusHabitos = styled.div`
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
        font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 22px;
    }

`
const BotaoMais = styled.button`
 width: 40px;
 height: 35px;
 background-color: #52B6FF;
 border-radius: 5px;
 border: none;
 display: flex;
 justify-content: center;
 align-items: center;

 ion-icon{
    font-size: 20px;
    color: white;
 }
`
const SemHabito = styled.div`
p{
 height: 74px;
 font-size: 17px;
 font-weight: 400;
 font-family: 'Lexend Deca', sans-serif;
 color: #666666;
}
`
