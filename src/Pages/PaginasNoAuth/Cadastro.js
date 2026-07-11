import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthLayout from '../../Components/Auth/AuthLayout';
import toast from 'react-hot-toast';
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

    if (formData.email !== formData.emailVerify) {
      toast.error("Os e-mails não correspondem.");
      return;
    }

    axios.post('http://localhost:4000/usuarios', { email, senha, data: dataNascimento, nome })
      .then(() => {
        toast.success("Usuário cadastrado com sucesso.");
        cleanAll();
      })
      .catch(() => {
        toast.error("Não foi possível concluir o cadastro.");
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
      toast.error("Os e-mails não correspondem.");
    } else {
      toast.success("E-mails conferem.");
    }
  };

  return (
    <AuthLayout
      eyebrow="Crie sua conta"
      title="Cadastrar"
      subtitle="Cadastre-se para salvar playlists, seguir artistas e voltar de onde parou."
      footer={
        <p className="auth-switch">
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
      }
    >
      <form className="box-form" onSubmit={handleSubmit}>
        <span className="form-social">
          <i className="item fa-brands fa-facebook"></i>
          <i className="item fa-brands fa-google"></i>
          <i className="item fa-brands fa-apple"></i>
        </span>

        <div className="auth-divider"><span>ou preencha seus dados</span></div>

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

        <button type="submit" className="submit-button">Criar conta</button>
      </form>
    </AuthLayout>
  );
}

export default Cadastro;
