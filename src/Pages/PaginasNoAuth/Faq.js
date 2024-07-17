import '../css/Faq.css';

function Faq() {
return (
<>
<div className="background">
        <div className="container">

            <div className="faq">
            <h1 className="title">Suporte <small className="text-muted">(Frequently Asked Questions)</small></h1>
            <br />
            <label htmlFor="search">Como podemos te ajudar?</label>

            <div className="input-group">
                <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
                <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary">Buscar</button>
                </div>
            </div>
            <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Ajuda com pagamentos</th>
                            <th scope="col">Ajuda com a conta</th>
                            <th scope="col">Ajuda com o plano</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="">Gerenciar pagamentos</a></td>
                            <td><a href="">Como entrar</a></td>
                            <td><a href="">Planos disponíveis</a></td>

                        </tr>
                        <tr>
                            <td><a href="">Formas de pagamento</a></td>
                            <td><a href="">Ajuda com o perfil</a></td>
                            <td><a href="">Preferências do plano</a></td>

                        </tr>
                        <tr>
                            <td><a href="">Ajuda com a cobrança</a></td>
                            <td><a href="">Configurações da conta</a></td>
                            <td><a href="">Premium Família e Kids</a></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><a href="">Segurança</a></td>
                            <td><a href="">Premium Duo</a></td>
                        </tr>
                    </tbody>
                </table>
            
            </div>
        </div>
        </div>
</>);
}

export default Faq;