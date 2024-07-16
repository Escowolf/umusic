import React, { useState } from 'react';
import UserExemple from '../img/User.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile(){
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    const [senha,setSenha] = useState(usuario.senha);
    const [data,setDataNascimento] = useState(usuario.senha);
    const [nome, setNome] = useState(usuario.nome);
    const [email, setEmail] = useState(usuario.email);
  
    function handleSubmit(e){
      e.preventDefault();
       axios.put(`http://localhost:4000/usuarios/${usuario._id}`,{ nome,senha,email,data })
       .then(res => (res))
       alert("Usuário alterado com sucesso!");
      }

    return(
    <>
    <div className='container'>
        <div className='perfil'>
            <h1>Perfil</h1>
        <center><img src={UserExemple} alt="" className="rounded-circle me-2"/></center>
        <form className="forms" onSubmit={(e) => handleSubmit(e)}>
        <label className="col-sm-10 col-form-label col-form-label-lg">Nome</label><br />
            <input className="form-control form-control-lg" 
            id="nome" 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            placeholder="Seu nome" required/><br />


        <label className="col-sm-10 col-form-label col-form-label-lg">Senha</label><br />
        <input className="form-control form-control-lg" 
            id="password" 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            placeholder="Senha" 
            required/><br />

        <label className="col-sm-10 col-form-label col-form-label-lg">Data de Nascimento</label><br />
        <input className="form-control form-control-lg" 
            id="dataNascimento" 
            type="date" 
            value={data}
            onChange={(e) => setDataNascimento(e.target.value)} 
            placeholder="Data de Nascimento" 
            required/><br />

          <center><button type="submit" value="Enviar" className="btn btn-primary btn-lg btn-block">Enviar</button></center>  
          </form>
        </div><br/><br/><br/>
      </div>
    </>)
    }

export default Profile;