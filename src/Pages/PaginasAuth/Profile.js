import React, { useEffect, useState } from 'react';
import UserExample from '../img/User.jpg';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function Profile() {
    const { token } = useAuth();
    const [usuario, setUsuario] = useState({ nome: '' });

    useEffect(() => {
        if (token) {
            try {
                const payloadBase64 = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payloadBase64));
                const userId = decodedPayload.usuario.id;

                axios.get(`http://localhost:4000/usuarios/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        setUsuario(response.data);
                    })
                    .catch((error) => {
                        console.error('Erro ao pegar dados do usuário:', error);
                    });
            } catch (e) {
                console.error('Token inválido:', e);
            }
        }
    }, [token]);

    return (
        <>
            <div className="profile-content">
                <div className="row">
                    <div className="col-4">
                        <img src={UserExample} id="userphoto" className="profile-photo" alt="User_example" />
                    </div>
                    <div className="col-8">
                        <h1 id="username" className="profile-name">{usuario.nome}</h1>
                    </div>
                </div>
                <br />
            </div>
        </>
    );
}

export default Profile;
