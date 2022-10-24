import styled from "styled-components"
import { AuthContext } from "./providers/auth"
import React from "react"
import axios from "axios"
export default function ListaHabitos(){
    const dias = ["D", "S", "T", "Q", "Q", "S", "S"]
    const {habitos} = React.useContext(AuthContext)
    const {setHabitos} = React.useContext(AuthContext)

    
    function deletarHabito(id){
        alert('Deseja deletar?')

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIwMiwiaWF0IjoxNjY2Mzc2OTUxfQ.NadZNeS7do4gIWNmw0r-OtN5qsDZ_0VZORH0K6xku7g"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }


        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
       setHabitos(habitos.filter(habito => habito.id !== id))


    }
 
    return( <>
    {habitos.map((h) => 
    <ContainerHabito>
        <img data-identifier="delete-habit-btn" onClick={() => deletarHabito(h.id)}src="./images/Vector.svg"></img>
         <p data-identifier="habit-name" >{h.name}</p>
        <ContainerDias>
        {dias.map((d, index) => <DiasSemana >{d}</DiasSemana>)}
        </ContainerDias>
    </ContainerHabito>
    )}
    </>

    )
}

const ContainerHabito = styled.div`
margin-bottom: 5px;
width: 340px;
height: 91px;
box-sizing: border-box;
padding: 13px;
background-color: white;
border-radius: 5px;
position: relative;
p{
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    font-size: 20px;
}
img{
    position: absolute;
    right: 10px;
}
`
const ContainerDias = styled.div`
display: flex;
`
const DiasSemana = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 30px;
height: 30px;
border-radius: 5px;
border: 1px solid #D5D5D5;
margin-top: 5px;
margin-right: 3px;
color: #DBDBDB;
background-color: white;
font-size: 20px;
font-family: 'Lexend Deca', sans-serif;
`