import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'; 
import AuthLayout from '../../Components/Auth/AuthLayout';
import toast from 'react-hot-toast';
import '../css/Forms.css';

function Login() {

    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:4000/usuarios?username=${encodeURIComponent(username)}`);
            const usuario = data[0];

            if (!usuario) {
                setError("Usuário não encontrado!");
                toast.error("Usuário não encontrado.");
                return;
            }

            if (usuario.senha !== senha) {
                setError("Senha incorreta!");
                toast.error("Senha incorreta.");
                return;
            } else {
                login(usuario);
                toast.success("Login realizado com sucesso.");
            }

        } catch (err) {
            console.error('API error:', err);
            setError("Ocorreu um erro. Tente novamente.");
            toast.error("Ocorreu um erro. Tente novamente.");
        }
    };

    return (
        <AuthLayout
            eyebrow="Bem-vindo de volta"
            title="Entrar"
            subtitle="Acesse sua conta para continuar sua experiência musical."
            footer={
                <p className="auth-switch">
                    Não tem cadastro? <Link to="/signup">Criar conta</Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="auth-form">
                <span className="form-social">
                    <i className="item fa-brands fa-facebook"></i>
                    <i className="item fa-brands fa-google"></i>
                    <i className="item fa-brands fa-apple"></i>
                </span>

                <div className="auth-divider"><span>ou use seu username</span></div>

                {error && <p className="error-message">{error}</p>}
                <div className="form-inputs">
                    <input
                        className="form-item"
                        id="username"
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        autoComplete="username"
                        required
                    />
                    <input
                        className="form-item"
                        id="password"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        autoComplete="current-password"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Entrar</button>
            </form>
        </AuthLayout>
    );
}

export default Login;
