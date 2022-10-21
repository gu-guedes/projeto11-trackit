import { useState } from "react"
import { AuthContext } from "./providers/auth"
import React from "react"
import styled from "styled-components"
import axios from "axios"
export default function AddHabito(props) {
    const { setHabitos } = React.useContext(AuthContext)
    const dias = ["D", "S", "T", "Q", "Q", "S", "S"]
    const [name, setName] = useState("")
    const [days, setDays] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [classe, setClasse] = useState("#FFFFFF")
    console.log(days)

   
    function adicionarHabito(e) {
        setCarregando(true)
        e.preventDefault()
        
        const body = {
            name: name,
            days: days
        }
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIwMiwiaWF0IjoxNjY2Mzc2OTUxfQ.NadZNeS7do4gIWNmw0r-OtN5qsDZ_0VZORH0K6xku7g"
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', body, config)
         promise.then((res) =>{
            console.log(res.data)
            setCarregando(false)
            props.setAbrirFormulario(false)
            setHabitos(res.data)
         })
         promise.catch((err) => {
            setCarregando(false)
            alert(err.response.data.details[0])
           
         })
    }   
    function selecionarDias(index) {
        if (!days.includes(index)) {
            setDays([...days, index])
         
        } else {
            const diasFiltrados = days.filter((numeroDaArray) => {
                if (index !== numeroDaArray) {
                    return true
                } else {
                    return false
                }
            })
            setDays(diasFiltrados)
            
        }



    }

    return (
        <form onSubmit={adicionarHabito}>
            <Formulario>
                <input
                disabled={carregando}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder=" nome do hábito"></input>
                <ContainerDias>
                    {dias.map((d, index) => <DiasSemana disabled={carregando} cor={classe} onClick={() => selecionarDias(index)}>{d}</DiasSemana>)}
                </ContainerDias>
                <Botoes>
                    <p>cancelar</p>
                    <button type="submit"> salvar</button>
                </Botoes>
            </Formulario>
        </form>
    )
}
const Formulario = styled.div`
margin-bottom: 20px;
border-radius: 5px;
height: 180px;
background-color: white;
padding: 15px 17px;
box-sizing: border-box;
input{
    width: 100%;
    height:45px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #D4D4D4;
}
input::placeholder{
    color: #DBDBDB;
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
background-color: ${props => props.cor};
font-size: 20px;
font-family: 'Lexend Deca', sans-serif;
`
const Botoes = styled.div`
 width: 190px;
 height: 35px;
 margin-top: 35px;
 margin-left: 120px;
 display: flex;
 justify-content: space-around;
 align-items: center;
 p{
    font-family: 'Lexend Deca', sans-serif;
    color:#52B6FF;
    font-size: 15px;

 }
 button{
    width: 84px;
height: 35px;
background-color: #52B6FF;
border-radius: 5px;
border: none;
color: white;
font-family: 'Lexend Deca', sans-serif;
font-size: 15px;

 }
 
`
