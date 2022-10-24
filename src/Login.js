import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
export default function Login(props) {
    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function fazerLogin(e) {
        setLogin(true)
        e.preventDefault()

        const body = {
            email: email,
            password: password
        } 
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body) 
        promise.then((res) => {
            console.log(res.data)
            props.setUser(res.data)
            navigate("/hoje")
        })
        promise.catch((err) => {
            alert(err.response.data.message)
            setLogin(false)
        })
    }
    return (
        <><form onSubmit={fazerLogin}>
            <ContainerLogin>
                <img src="./images/logo.jpg" />
                <input 
                data-identifier="input-email"
                disabled={login}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder=" email"></input>
                <input 
                data-identifier="input-password"
                disabled={login}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder=" senha"></input>
                <button 
                data-identifier="login-btn"
                disabled={login}
                type="submit">Entrar</button>
                <Link to="/cadastro"><p data-identifier="sign-up-action">Não tem uma conta? Cadastre-se!</p></Link>
            </ContainerLogin>
        </form>
        </>
    )
}

const ContainerLogin = styled.div`
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
    background-color: #52B6FF;
    opacity: 60%;

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