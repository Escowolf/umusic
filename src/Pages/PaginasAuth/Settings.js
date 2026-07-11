import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import '../css/DiscoveryPages.css';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';

const defaultSettings = {
  displayName: '',
  username: '',
  bio: '',
  volume: 75,
  autoplay: true,
  repeatPlaylist: false,
  restoreLast: true,
  theme: 'system',
  density: 'comfortable',
  profileVisibility: 'public',
  showPublicPlaylists: true,
  showRecentActivity: true,
};

function Settings() {
  const { currentUser, logout, updateCurrentUser } = useAuth();
  const [section, setSection] = useState('perfil');
  const [settings, setSettings] = useState(defaultSettings);
  const [userData, setUserData] = useState(currentUser);
  const [loadingUser, setLoadingUser] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const photoInputRef = useRef(null);

  const normalizeUser = (user) => {
    if (!user) {
      return user;
    }

    return {
      ...user,
      displayName: user.displayName || user.nome || user.username || user.email || 'Usuário',
      username: user.username || user.email || '',
    };
  };

  const getUserFallback = () => {
    if (currentUser) {
      return currentUser;
    }

    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        return null;
      }

      const payload = JSON.parse(atob(storedToken));
      return payload?.usuario ?? null;
    } catch {
      return null;
    }
  };
  const fallbackUser = getUserFallback();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('umusic-settings');
      if (stored) setSettings((current) => ({ ...current, ...JSON.parse(stored) }));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  useEffect(() => {
    let isMounted = true;

    const userId = currentUser?.id ?? fallbackUser?.id;
    const userEmail = currentUser?.email ?? fallbackUser?.email;

    if (!userId) {
      setUserData(normalizeUser(fallbackUser));
      setLoadingUser(false);
      return () => {
        isMounted = false;
      };
    }

    setLoadingUser(true);
    api.get(`/usuarios/${userId}`)
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }

        setUserData(normalizeUser({ ...fallbackUser, ...data }));
        setSettings((current) => ({
          ...current,
          displayName: data?.displayName || data?.nome || fallbackUser?.displayName || fallbackUser?.nome || current.displayName,
          username: data?.username || data?.email || fallbackUser?.username || fallbackUser?.email || current.username,
        }));
      })
      .catch(() => {
        if (isMounted) {
          if (userEmail) {
            api.get(`/usuarios?email=${encodeURIComponent(userEmail)}`)
              .then(({ data }) => {
                if (!isMounted) {
                  return;
                }

                const matchedUser = Array.isArray(data) && data.length > 0 ? data[0] : fallbackUser;
                setUserData(normalizeUser(matchedUser));
                setSettings((current) => ({
                  ...current,
                  displayName: matchedUser?.displayName || matchedUser?.nome || current.displayName,
                  username: matchedUser?.username || matchedUser?.email || current.username,
                }));
              })
              .catch(() => {
                if (isMounted) {
                  setUserData(normalizeUser(fallbackUser));
                }
              });
          } else {
            setUserData(normalizeUser(fallbackUser));
          }
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoadingUser(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const save = () => {
    const persistSettings = () => {
      localStorage.setItem('umusic-settings', JSON.stringify(settings));
      toast.success('Configurações salvas.');
    };

    const userId = currentUser?.id ?? fallbackUser?.id;
    if (!userId) {
      persistSettings();
      return;
    }

    const payload = {
      ...userData,
      ...settings,
      nome: settings.displayName || userData?.displayName || userData?.nome || fallbackUser?.displayName || fallbackUser?.nome || '',
      displayName: settings.displayName || userData?.displayName || userData?.nome || fallbackUser?.displayName || fallbackUser?.nome || '',
      username: settings.username || userData?.username || userData?.email || fallbackUser?.username || fallbackUser?.email || '',
    };

    const request = photoFile
      ? fileToDataUrl(photoFile).then((photoDataUrl) =>
          api.put(`/usuarios/${userId}`, {
            ...payload,
            user_photo: photoDataUrl,
          }),
        )
      : api.put(`/usuarios/${userId}`, payload);

    request
      .then(({ data }) => {
        const mergedUser = normalizeUser({ ...userData, ...data });
        setUserData(mergedUser);
        updateCurrentUser?.(mergedUser);
        setPhotoFile(null);
        persistSettings();
      })
      .catch(() => {
        toast.error('Não foi possível atualizar a foto agora.');
      });
  };

  const updateField = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Falha ao ler imagem.'));
      reader.readAsDataURL(file);
    });

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setPhotoFile(file);
    setUserData((current) => ({ ...current, user_photo: previewUrl }));
  };

  const openPhotoPicker = () => {
    photoInputRef.current?.click();
  };

  return (
    <section className="discovery-page">
      <header className="discovery-hero">
        <div className="discovery-hero__icon">
          <img className="settings-avatar" src={userData?.user_photo || fallbackUser?.user_photo || '/img/profile.jpg'} alt="Foto de perfil" />
        </div>
        <div className="discovery-hero__content">
          <p className="discovery-hero__eyebrow">Configurações</p>
          <h1>Ajustes simples da conta e da reprodução.</h1>
          <p>{loadingUser ? 'Carregando dados do usuário...' : 'Ajuste sua conta, reprodução, aparência e privacidade em um só lugar.'}</p>
        </div>
      </header>

      <div className="tabs-bar">
        {['perfil', 'reproducao', 'aparencia', 'privacidade'].map((item) => (
          <button key={item} type="button" className={`tab-btn ${section === item ? 'is-active' : ''}`} onClick={() => setSection(item)}>
            {item === 'perfil' ? 'Perfil' : item === 'reproducao' ? 'Reprodução' : item === 'aparencia' ? 'Aparência' : 'Privacidade'}
          </button>
        ))}
      </div>

      {section === 'perfil' && (
        <div className="settings-panel">
          <div className="settings-layout">
            <div className="settings-photo-column">
              <label className="settings-label">Foto</label>
              <div className="settings-photo-card">
                <img className="settings-avatar settings-avatar--large" src={userData?.user_photo || fallbackUser?.user_photo || '/img/profile.jpg'} alt="Foto de perfil" />
              </div>
              <input ref={photoInputRef} id="settings-photo-input" className="settings-photo-input" type="file" accept="image/*" onChange={handlePhotoChange} />
              <button type="button" className="settings-photo-btn" onClick={openPhotoPicker}>Editar foto</button>
            </div>
            <div className="settings-fields-column">
              <label className="settings-label">Nome de exibição</label>
              <input className="settings-input" value={settings.displayName || userData?.displayName || userData?.nome || fallbackUser?.displayName || fallbackUser?.nome || ''} onChange={(e) => updateField('displayName', e.target.value)} />
              <label className="settings-label">E-mail</label>
              <input className="settings-input" value={userData?.email || fallbackUser?.email || ''} readOnly />
              <label className="settings-label">Username</label>
              <input className="settings-input" value={settings.username || userData?.username || userData?.email || fallbackUser?.username || fallbackUser?.email || ''} onChange={(e) => updateField('username', e.target.value)} />
              <label className="settings-label">Biografia</label>
              <textarea className="settings-textarea" value={settings.bio} onChange={(e) => updateField('bio', e.target.value)} />
              <div className="settings-actions settings-actions--right">
                <button type="button" className="settings-save" onClick={save}>Salvar alterações</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {section === 'reproducao' && (
        <div className="settings-panel">
          <label className="settings-label">Volume padrão</label>
          <input className="settings-range" type="range" min="0" max="100" value={settings.volume} onChange={(e) => updateField('volume', Number(e.target.value))} />
          <label className="settings-switch"><input type="checkbox" checked={settings.autoplay} onChange={(e) => updateField('autoplay', e.target.checked)} /> Reproduzir próxima música automaticamente</label>
          <label className="settings-switch"><input type="checkbox" checked={settings.repeatPlaylist} onChange={(e) => updateField('repeatPlaylist', e.target.checked)} /> Repetir playlist ao finalizar</label>
          <label className="settings-switch"><input type="checkbox" checked={settings.restoreLast} onChange={(e) => updateField('restoreLast', e.target.checked)} /> Restaurar última reprodução</label>
          <div className="settings-actions"><button type="button" className="settings-save" onClick={save}>Salvar alterações</button></div>
        </div>
      )}

      {section === 'aparencia' && (
        <div className="settings-panel">
          <label className="settings-label">Tema</label>
          <select className="settings-input" value={settings.theme} onChange={(e) => updateField('theme', e.target.value)}>
            <option value="system">Sistema</option>
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
          <label className="settings-label">Densidade</label>
          <select className="settings-input" value={settings.density} onChange={(e) => updateField('density', e.target.value)}>
            <option value="comfortable">Confortável</option>
            <option value="compact">Compacta</option>
          </select>
          <div className="settings-actions"><button type="button" className="settings-save" onClick={save}>Salvar alterações</button></div>
        </div>
      )}

      {section === 'privacidade' && (
        <div className="settings-panel">
          <label className="settings-switch"><input type="checkbox" checked={settings.profileVisibility === 'public'} onChange={(e) => updateField('profileVisibility', e.target.checked ? 'public' : 'private')} /> Perfil público</label>
          <label className="settings-switch"><input type="checkbox" checked={settings.showPublicPlaylists} onChange={(e) => updateField('showPublicPlaylists', e.target.checked)} /> Mostrar playlists públicas</label>
          <label className="settings-switch"><input type="checkbox" checked={settings.showRecentActivity} onChange={(e) => updateField('showRecentActivity', e.target.checked)} /> Mostrar atividade recente</label>
          <div className="settings-danger">
            <strong>Zona de risco</strong>
            <div className="danger-actions">
              <button type="button" className="btn btn--ghost" onClick={logout}>Sair da conta</button>
              <button type="button" className="settings-danger-btn" onClick={() => window.confirm('Excluir conta?') && toast('Ação indisponível no momento.')}>Excluir conta</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Settings;
