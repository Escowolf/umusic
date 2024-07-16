import PlayUser from './PlayUser';
import UserExemple from '../img/User.jpg';
import './HomeAuth.css';


function HomeAuth(){
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    
    return(<>
      <div className="container">
        
        <div className="BoxPerfil">
        <div className="row">
          <div className="col-4">
          <img src={UserExemple} id="perfil" className="perfil" alt="Machado_example" />
          </div>
          <div className="col-8">
          <h1 id="UserHome" className="UserNome">{usuario.nome}</h1>
          </div>
        </div>
        <br/>
      </div>
      <PlayUser/>
      </div>
      
      </>)
      }

export default HomeAuth;

