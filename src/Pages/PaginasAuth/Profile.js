import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import '../css/Profile.css';

function Profile() {
    const { token, currentUser } = useAuth();
    const [usuario, setUsuario] = useState({ nome: '', user_photo: '' });
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(currentUser?.nome || '');
    const [newPhoto, setNewPhoto] = useState(null);

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

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhotoChange = (event) => {
        setNewPhoto(event.target.files[0]);
    };

    const handleSaveClick = () => {
        if (token) {
            const formData = new FormData();
            formData.append('nome', newName);
            if (newPhoto) {
                formData.append('user_photo', newPhoto);
            }

            axios.put(`http://localhost:4000/usuarios/${currentUser?.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                // Atualiza o nome e a foto no estado local
                setUsuario(prev => ({
                    ...prev,
                    nome: newName,
                    user_photo: newPhoto ? URL.createObjectURL(newPhoto) : prev.user_photo
                }));
                setEditMode(false);
            })
            .catch((error) => {
                console.error('Erro ao atualizar o perfil:', error);
            });
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={usuario.user_photo || currentUser?.user_photo}
                    className="profile-photo"
                    alt="User Example"
                />
                <div className="profile-info">
                    {editMode ? (
                        <div className="profile-edit">
                            <input
                                type="text"
                                value={newName}
                                onChange={handleNameChange}
                                className="profile-input"
                                placeholder="Nome"
                            />
                            <input
                                type="file"
                                onChange={handlePhotoChange}
                                className="profile-file-input"
                                accept="image/*"
                            />
                            <button onClick={handleSaveClick} className="profile-save-btn">
                                Salvar
                            </button>
                        </div>
                    ) : (
                        <div className="profile-view">
                            <h1 className="profile-name">{usuario.nome}</h1>
                            <button onClick={handleEditClick} className="profile-edit-btn">
                                Editar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;

