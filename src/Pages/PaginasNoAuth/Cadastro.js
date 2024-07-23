import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from '../img/logoUmus.png';
import '../css/Forms.css';

export function Cadastro() {
  const [formData, setFormData] = useState({
    email: "",
    emailVerify: "",
    senha: "",
    dataNascimento: "",
    nome: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, senha, dataNascimento, nome } = formData;

    axios.post('http://localhost:4000/usuarios', { email, senha, data: dataNascimento, nome })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        cleanAll();
      });
  };

  const cleanAll = () => {
    setFormData({
      email: "",
      emailVerify: "",
      senha: "",
      dataNascimento: "",
      nome: "",
    });
  };

  const comparaEmail = () => {
    if (formData.email !== formData.emailVerify) {
      alert("Os e-mails não correspondem!");
    } else {
      console.log("Tudo ok!");
    }
  };

  return (
    <div className="cadastro-form">
      <img src={logo} className="logo-form" alt="Logo site" />
      <h1>Sing up to start using</h1>
      <form className="box-form" onSubmit={handleSubmit}>
        <input
          className="form-item"
          id="email"
          value={formData.email}
          type="email"
          onChange={handleChange}
          placeholder="E-mail"
          required
        /><br />
        <input
          className="form-item"
          id="emailVerify"
          value={formData.emailVerify}
          type="email"
          onBlur={comparaEmail}
          onChange={handleChange}
          placeholder="Confirmar e-mail"
          required
        /><br />
        <input
          className="form-item"
          id="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
        /><br />
        <input
          className="form-item"
          id="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Como devemos chamar você?"
          required
        /><br />
        <div className="form-personal">
          <div className="form-choice">
            <label className="form-label">Data de Nascimento</label>
            <input
              className="form-data"
              id="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-choice">
            <label className="form-label">Gênero</label>
            <div className="form-radio">
              <input type="radio" name="gender" id="genderFemale" value="Feminino" />
              <label htmlFor="genderFemale">Feminino</label>
            </div>
            <div className="form-radio">
              <input type="radio" name="gender" id="genderMale" value="Masculino" />
              <label htmlFor="genderMale">Masculino</label>
            </div>
            <div className="form-radio">
              <input type="radio" name="gender" id="genderNonBinary" value="Não-binário" />
              <label htmlFor="genderNonBinary">Não-binárie</label>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Enviar</button>
        <p> Already have an account? Log in <Link to="/login" className="highlight">here</Link>.</p>
      </form>
    </div>
  );
}

export default Cadastro;
