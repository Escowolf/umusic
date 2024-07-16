import { useState } from "react";
import axios from "axios";
import logo from '../img/logoUmus.png';
import { Link, useNavigate } from "react-router-dom";

import '../css/Login.css';

function Login(){
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [login,setLogin] = useState();


function handleSubmit(e){
e.preventDefault();
/*Email utilizado como chave de busca de dados no JSON */
    axios.get(`http://localhost:4000/usuarios?email=${email}`)
    .then((res)=> {
        /*Constante para manter os dados do usuário */
    const usuario = res.data[0];

    if(usuario.senha!== senha){
        alert("Dados inválidos!");
        return
    }

    setLogin(localStorage.setItem('usuarioLogado',JSON.stringify(usuario)));
    navigate("/home");
})
}


return (
    <>
    <div className="container">
        <div className="forms">
            <section className="login">
                <br/><br/><br/>
            <form onSubmit={(e) => handleSubmit(e)}>
                <center> 
                    <img src={logo} className="d-inline-block align-top" height="70" alt="Logo site"></img><br/>
                    <h1>Login</h1>
                </center>
                <br/><br /><br />
        
        <input className="form-control form-control-lg" id="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required/><br />
        <input className="form-control form-control-lg" id="password" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required/><br />

        <center>
            <button type="submit" value="Enviar" className="btn btn-primary btn-lg btn-block">Enviar</button>
        </center>  
        <p>
        Não tem cadastro?&nbsp;&nbsp;
        <Link to="/inscricao" className="Subscript">Inscreva-se!</Link>
        </p>
            </form>
        </section>
        </div>
    </div>
    <br/><br/><br/>
    </>
);
}

export default Login;