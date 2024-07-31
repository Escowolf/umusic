import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { database, storage, ref as dbRef, set, get, ref as storageRef, uploadBytes, getDownloadURL } from '../../contexts/firebaseConfig';
import '../css/Profile.css';

function Profile() {
    const { currentUser } = useAuth(); // Obtém o usuário autenticado
    const [usuario, setUsuario] = useState({ nome: '', user_photo: '' });
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(currentUser?.displayName || ''); // Usar displayName se disponível
    const [newPhoto, setNewPhoto] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.uid; // Usar UID do Firebase Auth

            // Recupera dados do usuário
            const userRef = dbRef(database, `usuarios/${userId}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setUsuario(snapshot.val());
                }
            }).catch((error) => {
                console.error('Erro ao pegar dados do usuário:', error);
            });
        }
    }, [currentUser]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handlePhotoChange = (event) => {
        setNewPhoto(event.target.files[0]);
    };

    const handleSaveClick = async () => {
        if (currentUser) {
            try {
                const userId = currentUser.uid; 
                let photoURL = usuario.user_photo;

                if (newPhoto) {
                    const photoRef = storageRef(storage, `user_photos/${userId}`);
                    await uploadBytes(photoRef, newPhoto);
                    photoURL = await getDownloadURL(photoRef);
                }

                // Atualiza os dados do usuário no Realtime Database
                const userRef = dbRef(database, `usuarios/${userId}`);
                await set(userRef, {
                    nome: newName,
                    user_photo: photoURL
                });

                // Atualiza o estado local
                setUsuario(prev => ({
                    ...prev,
                    nome: newName,
                    user_photo: photoURL
                }));
                setEditMode(false);
            } catch (error) {
                console.error('Erro ao atualizar o perfil:', error);
            }
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={usuario.user_photo || currentUser?.photoURL}
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