import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function UserHome() {
 const location = useLocation();
 const [nome, setNome] = useState();

 useEffect(() => {
    axios.get(`http://localhost:4000/usuarios/${location.state.id}`)
        .then((res) => {
          console.log(res.data)
          setNome(res.data.nome)
        });
  }, []) 

return(<>

<h1>{nome}</h1>

</>)
}


export default UserHome;