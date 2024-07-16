import { useState } from "react";
import axios from "axios";
import '../css/Cadastro.css'

export function Cadastro() {
  const [email, setEmail] = useState("");
  const [emailVerify,setEmailVerify] = useState("");
  const [senha,setSenha] = useState("");
  const [data,setDataNascimento] = useState("");
  const [nome, setNome] = useState("");
  

  function handleSubmit(e){
    e.preventDefault();

      axios.post('http://localhost:4000/usuarios', {
        email, senha, data, nome 
      })
      .then((res)=> (res.data))

    alert("Usuário cadastrado com sucesso!");

    cleanAll();
  }

  function cleanAll(){
    setNome("");
    setEmail("");
    setEmailVerify("");
    setSenha("");
    setDataNascimento("");
  }

  function comparaEmail(){
//criar uma variável que exiba se os e-mails correspondem ou não;
    if (email != emailVerify){
      alert("Os e-mails não correspondem!");
    }else{
      console.log("Tudo ok!")
    }
  }

  return (
    <div className="cadastro">
      <div className="container">
        
        <br /><br />
          <h1>Increva-se</h1>
          <br /><br />
          <form className="formBox" onSubmit={(e) => handleSubmit(e)}>
            <input className="form-control form-control-lg" id="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required/><br />
            <input className="form-control form-control-lg" id="emailVerify"  value={emailVerify} type="email" onBlur={comparaEmail} onChange={(e) => setEmailVerify(e.target.value)} placeholder="Confirmar e-mail" required/><br />
            <input className="form-control form-control-lg" id="password" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required/><br />
            <input className="form-control form-control-lg" id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como devemos chamar você?" required/><br />
            <label className="col-sm-10 col-form-label col-form-label-lg">Data de Nascimento</label><br />
            <input className="form-control form-control-lg" id="dataNascimento" type="date" value={data}onChange={(e) => setDataNascimento(e.target.value)} placeholder="Data de Nascimento" required/><br />

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Feminino" />
              <label className="form-check-label">Feminino</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Masculino<" />
              <label className="form-check-label">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Não-binário" />
              <label className="form-check-label">Não-binário</label>
            </div><br/><br/>


          <center><button type="submit" value="Enviar" className="btn btn-primary btn-lg btn-block">Enviar</button></center>  
          </form>
        </div><br/><br/><br/>
      </div>
    
  );
}


export default Cadastro;