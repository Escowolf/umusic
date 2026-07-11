import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import '../css/Profile.css';

const decodeStoredToken = (storedToken) => {
    try {
        const payload = JSON.parse(atob(storedToken));
        return payload?.usuario ?? null;
    } catch (error) {
        return null;
    }
};

function Profile() {
    const { token, currentUser, updateCurrentUser } = useAuth();
    const [usuario, setUsuario] = useState({ displayName: '', username: '', user_photo: '' });
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(currentUser?.displayName || '');
    const [newPhoto, setNewPhoto] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = decodeStoredToken(token);
                const userId = decodedUser?.id ?? currentUser?.id;

                if (!userId) {
                    throw new Error('Usuário não encontrado no token');
                }

                axios.get(`http://localhost:4000/usuarios/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                    setUsuario({
                        ...response.data,
                        displayName: response.data?.displayName || response.data?.nome || response.data?.username || response.data?.email || '',
                        username: response.data?.username || response.data?.email || '',
                    });
                })
                    .catch((error) => {
                        console.error('Erro ao pegar dados do usuário:', error);
                    });
            } catch (e) {
                console.error('Token inválido:', e);
            }
        }
    }, [token, currentUser?.id]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhotoChange = (event) => {
        setNewPhoto(event.target.files[0]);
    };

    const fileToDataUrl = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Falha ao ler imagem.'));
            reader.readAsDataURL(file);
        });

    const handleSaveClick = () => {
        if (token) {
            const payload = {
                ...usuario,
                displayName: newName,
                nome: newName,
                username: usuario.username || currentUser?.username || currentUser?.email || '',
            };

            const request = newPhoto
                ? fileToDataUrl(newPhoto).then((userPhoto) =>
                    axios.put(`http://localhost:4000/usuarios/${currentUser?.id}`, {
                    ...payload,
                    user_photo: userPhoto,
                }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                )
                : axios.put(`http://localhost:4000/usuarios/${currentUser?.id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

            request
            .then(({ data }) => {
                const nextUser = {
                    ...usuario,
                    ...data,
                    displayName: data?.displayName || data?.nome || newName,
                    username: data?.username || usuario.username || currentUser?.username || currentUser?.email || '',
                };

                setUsuario(nextUser);
                updateCurrentUser?.(nextUser);
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
                            <h1 className="profile-name">{usuario.displayName}</h1>
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
