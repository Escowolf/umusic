import PlayUser from './PlayUser';
import UserExemple from '../img/User.jpg';
import './HomeAuth.css';


function Profile(){
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    
    return(<>

        <div className="profile-content">
        <div className="row">
          <div className="col-4">
          <img src={UserExemple} id="userphoto" className="profile-photo" alt="Machado_example" />
          </div>
          <div className="col-8">
          <h1 id="username" className="profile-name">{usuario.nome}</h1>
          </div>
        </div>
        <br/>
      </div>
      <PlayUser/>
      
      </>)
      }

export default Profile;

