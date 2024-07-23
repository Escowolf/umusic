import { useState } from "react";
import axios from "axios";
import logo from '../img/logoUmus.png';
import { Link, useNavigate } from "react-router-dom";
import '../css/Forms.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get(`http://localhost:4000/usuarios?email=${email}`);
            const usuario = data[0];

            if (!usuario || usuario.senha !== senha) {
                setError("Dados inválidos!");
                return;
            }

            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            navigate("/home");
        } catch (err) {
            console.error(err);
            setError("Ocorreu um erro. Tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">

            <img src={logo} className="logo-form" alt="Logo site" />
            <h1>Log in to uMusic</h1>
            <span className="form-social">
                <i className="item fa-brands fa-facebook"></i>
                <i className="item fa-brands fa-google"></i>
                <i className="item fa-brands fa-apple"></i>
            </span>

            <hr />
            {error && <p className="error-message">{error}</p>}
            <div className="form-inputs">
                <input
                    className="form-item"
                    id="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                />
                <input
                    className="form-item"
                    id="password"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
                    required
                />
            </div>
            <button type="submit" className="submit-button">Enviar</button>
            <p className="signup-link">
                Não tem cadastro?&nbsp;
                <Link to="/signup" className="highlight">Inscreva-se!</Link>
            </p>


        </form>
    );

}

export default Login;
