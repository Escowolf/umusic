import { Link } from 'react-router-dom';
import '../css/Faq.css';

function Faq() {
    return (
        <div className="background">
            <div className="faq-shell">
                <div className="faq-hero">
                    <p className="faq-eyebrow">Central de ajuda</p>
                    <h1 className="title">Suporte</h1>
                    <p className="faq-subtitle">
                        Encontre respostas rápidas sobre conta, plano e pagamentos.
                    </p>
                    <div className="input-group">
                        <label htmlFor="search" className="sr-only">Como podemos te ajudar?</label>
                        <input id="search" type="text" className="form-control" placeholder="Buscar artigos, pagamentos, conta..." />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-outline-secondary">Buscar</button>
                        </div>
                    </div>
                </div>

                <div className="faq-grid">
                    <section className="faq-card">
                        <h2>Ajuda com pagamentos</h2>
                        <button type="button">Gerenciar pagamentos</button>
                        <button type="button">Formas de pagamento</button>
                        <button type="button">Ajuda com a cobrança</button>
                    </section>
                    <section className="faq-card">
                        <h2>Ajuda com a conta</h2>
                        <Link to="/login">Como entrar</Link>
                        <Link to="/perfil">Ajuda com o perfil</Link>
                        <button type="button">Configurações da conta</button>
                    </section>
                    <section className="faq-card">
                        <h2>Ajuda com o plano</h2>
                        <button type="button">Planos disponíveis</button>
                        <button type="button">Preferências do plano</button>
                        <button type="button">Premium Família e Kids</button>
                        <button type="button">Premium Duo</button>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Faq;
