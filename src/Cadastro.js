import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
export default function Cadastro() {
    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] =  useState("")
    const navigate = useNavigate()

    function fazerCadastro(e){
        e.preventDefault()
        setLogin(true)

        const body = {
            email: email,
            name: name,
            image: image,
            password: password
        } 
        
        
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body)
        
        promise.then((res) => {
            navigate("/")
        })
        promise.catch((err) => {
            alert(err.response.data.message)
            setLogin(false)
        })
    }
    return (
    <>
        <form onSubmit={fazerCadastro}>
            <ContainerCadastro>
                <img src="./images/logo.jpg" />
                <input 
                disabled={login}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder=" email"></input>
                <input 
                disabled={login}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder=" senha"></input>
                <input 
                disabled={login}
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder=" nome"></input>
                <input 
                disabled={login}
                required
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder=" foto"></input>
                <button disabled={login} >Cadastrar</button>
                <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
            </ContainerCadastro>
            </form>
        </>
    )
}

const ContainerCadastro = styled.div`
width: 375px;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

img{
    margin-bottom: 30px;
}

input{
    margin-top: 6px;
    width: 303px;
    height: 45px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
}
input:disabled{
    background-color: grey;
}
button{
    margin-top: 6px;
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 5px;
    border: 1px solid #52B6FF;
    color: white;
    font-size: 20px;
    font-weight: 400;
    font-family: 'Lexend Deca', sans-serif;
}
button:disabled{
    background-color: red;
}
p{
    margin-top: 25px;
    text-decoration: underline;
    font-weight: 400;
    font-size: 14px;
    color:#52B6FF;
    font-family: 'Lexend Deca', sans-serif;
}
`