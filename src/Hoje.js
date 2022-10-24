import styled from "styled-components"
import dayjs from "dayjs"
import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { AuthContext } from "./providers/auth"
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import ListaHabitos from "./ListaHabitos"
export default function Hoje(props) {

    const date = dayjs().locale("pt-br").format("dddd, DD/MM").replace("-feira", "");
    require('dayjs/locale/pt-br')
    const { user, habitos, setHabitos, setPorcentagem, porcentagem } = React.useContext(AuthContext)

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIwMiwiaWF0IjoxNjY2Mzc2OTUxfQ.NadZNeS7do4gIWNmw0r-OtN5qsDZ_0VZORH0K6xku7g"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function checkarHabito(done, id) {
        if (done === false) {

            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config)
            promise.then((res) => {
                console.log(res.data)
                props.listarHabitos()

            })
            promise.catch((err) => {
                console.log(err.response.data)
            })
        } else {

            const desmarcar = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config)
            desmarcar.then((res) => {
                console.log(res.data)
                props.listarHabitos()

            })
            desmarcar.catch((err) => {
                console.log(err.response.data)
            })
            console.log(habitos)

        }
    }



    if (habitos.length > 0) {
        return (
            <>
                <ContainerTopo>
                    <p>TrackIt</p>
                    <img data-identifier="avatar" src={user.image}></img>
                </ContainerTopo>
                <ContainerConteudo>
                    <DiaAtual>
                        <h1 data-identifier="today-infos">{date}
                        </h1>
                        <p data-identifier="today-infos">{props.progressao === 0 ? "Nenhum habito concluido ainda" : `${props.progressao} % dos hábitos concluidos`}</p>
                    </DiaAtual>
                    {habitos.map((habito) =>
                        <HabitoDoDia key={habito.id}>
                            <Escrito>
                                <h2>{habito.name}</h2>
                                <p data-identifier="today-infos">sequencia atual: {habito.currentSequence} dias</p>
                                <p data-identifier="today-infos">seu record: {habito.highestSequence} dias</p>
                            </Escrito>
                            <BotaoCheck cor={habito.done ? "#8FC549" : "#EBEBEB"} onClick={() => checkarHabito(habito.done, habito.id)}>
                                <ion-icon name="checkmark-sharp"></ion-icon>
                            </BotaoCheck>
                        </HabitoDoDia>)}
                </ContainerConteudo>
                <ContainerMenu>
                    <Link to="/habitos"><p>Hábitos</p></Link>
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
                            })}> <div style={{ fontSize: 18, marginTop: -10, color: "#fff", fontFamily: 'Lexend Deca' }}>Hoje</div></CircularProgressbarWithChildren>
                    </div>
                    <p>Histórico</p>
                </ContainerMenu>
            </>

        )
    }
}

const DiaAtual = styled.div`
width: 340px;
height: 94px;
background-color: #F2F2F2;
display: flex;
justify-content: center;
flex-direction: column;
h1{
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 22px;
}
p{
    margin-top: 5px;
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 22px;
color:#BABABA;
}
`

const HabitoDoDia = styled.div`
width: 340px;
height: 94px;
background-color: white;
margin-bottom: 5px;
box-sizing: border-box;
padding: 13px;
display: flex;
justify-content: space-between;
h2{
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 25px;
color: #666666;
margin-bottom: 10px;
}
p{
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #666666;
}
`
const Escrito = styled.div`
`
const BotaoCheck = styled.button`
width: 69px;
height: 69px;
background: ${props => props.cor};
border: 1px solid #E7E7E7;
border-radius: 5px;
ion-icon{
    font-size:40px;
    color: white;
}
`
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
a{
    text-decoration: none;
}
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
box-sizing: border-box;`