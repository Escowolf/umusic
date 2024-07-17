import { useState } from "react";
import axios from "axios";
import './Cadastro.css'

export function Cadastro() {
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [senha, setSenha] = useState("");
  const [data, setDataNascimento] = useState("");
  const [nome, setNome] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:4000/usuarios', {
      email, senha, data, nome
    })
      .then((res) => (res.data))

    alert("Usuário cadastrado com sucesso!");

    cleanAll();
  }

  function cleanAll() {
    setNome("");
    setEmail("");
    setEmailVerify("");
    setSenha("");
    setDataNascimento("");
  }

  function comparaEmail() {
    //criar uma variável que exiba se os e-mails correspondem ou não;
    if (email !== emailVerify) {
      alert("Os e-mails não correspondem!");
    } else {
      console.log("Tudo ok!")
    }
  }

  return (
    <div className="cadastro">
      <div className="section">
        <h1>Inscreva-se</h1>
        <form className="box-form" onSubmit={(e) => handleSubmit(e)}>
          <input className="form-item" id="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required /><br />
          <input className="form-item" id="emailVerify" value={emailVerify} type="email" onBlur={comparaEmail} onChange={(e) => setEmailVerify(e.target.value)} placeholder="Confirmar e-mail" required /><br />
          <input className="form-item" id="password" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required /><br />
          <input className="form-item" id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como devemos chamar você?" required /><br />
          <div className="form-choice">
            <span>
              <label className="form-item">Data de Nascimento</label>
              <input className="form-item form-data" id="dataNascimento" type="date" value={data} onChange={(e) => setDataNascimento(e.target.value)} placeholder="Data de Nascimento" required />
            </span>
            <span>
            <label className="form-item">Gênero</label>
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
                <label className="form-check-label">Não-binárie</label>
              </div>
            </span>
          </div>


          <center><button type="submit" value="Enviar" className="btn btn-primary btn-lg btn-block">Enviar</button></center>
        </form>
      </div>
    </div>
  );
}


export default Cadastro;