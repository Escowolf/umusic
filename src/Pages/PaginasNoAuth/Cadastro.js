// Cadastro.js
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../img/logoUmus.png';
import { database, ref, set } from '../../contexts/firebaseConfig'; 
import '../css/Forms.css';

export function Cadastro() {
  const [formData, setFormData] = useState({
    email: "",
    emailVerify: "",
    senha: "",
    dataNascimento: "",
    nome: "",
    genero: "" 
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, senha, dataNascimento, nome, genero } = formData;

    if (email !== formData.emailVerify) {
      alert("Os e-mails não correspondem!");
      return;
    }

    try {
      // Envia dados para a API local (opcional, pode ser removido se não for necessário)
      await axios.post('http://localhost:4000/usuarios', { email, senha, data: dataNascimento, nome });

      // Salva dados no Realtime Database
      const userRef = ref(database, 'usuarios/' + email.replace(/[^a-zA-Z0-9]/g, '_')); // Substitua caracteres não alfanuméricos no email para criar uma referência única
      await set(userRef, {
        email,
        senha,
        dataNascimento,
        nome,
        genero
      });

      alert("Usuário cadastrado com sucesso!");
      cleanAll();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert("Ocorreu um erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  const cleanAll = () => {
    setFormData({
      email: "",
      emailVerify: "",
      senha: "",
      dataNascimento: "",
      nome: "",
      genero: ""
    });
  };

  const comparaEmail = () => {
    if (formData.email !== formData.emailVerify) {
      alert("Os e-mails não correspondem!");
    }
  };

  const handleGenderChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      genero: e.target.value
    }));
  };

  return (
    <div className="cadastro-form">
      <img src={logo} className="logo-form" alt="Logo site" />
      <h1>Sign up to start using</h1>
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
              <input
                type="radio"
                name="gender"
                id="genderFemale"
                value="Feminino"
                checked={formData.genero === "Feminino"}
                onChange={handleGenderChange}
              />
              <label htmlFor="genderFemale">Feminino</label>
            </div>
            <div className="form-radio">
              <input
                type="radio"
                name="gender"
                id="genderMale"
                value="Masculino"
                checked={formData.genero === "Masculino"}
                onChange={handleGenderChange}
              />
              <label htmlFor="genderMale">Masculino</label>
            </div>
            <div className="form-radio">
              <input
                type="radio"
                name="gender"
                id="genderNonBinary"
                value="Não-binário"
                checked={formData.genero === "Não-binário"}
                onChange={handleGenderChange}
              />
              <label htmlFor="genderNonBinary">Não-binário</label>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Enviar</button>
        <p> Já tem uma conta? Faça login <Link to="/login" className="highlight">aqui</Link>.</p>
      </form>
    </div>
  );
}

export default Cadastro;