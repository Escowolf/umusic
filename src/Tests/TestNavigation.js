import { useNavigate } from 'react-router-dom';

function TestNavigation() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        console.log(`Navigating to ${path}`);
        navigate(path);
    };

    return (
        <div>
            <h1>Test Navigation</h1>
            <button onClick={() => handleNavigation("/")}>Go to Home</button>
            <button onClick={() => handleNavigation("/faq")}>Go to FAQ</button>
            <button onClick={() => handleNavigation("/play")}>Go to Playlist List</button>
            <button onClick={() => handleNavigation("/playlists/1")}>Go to Playlist Detail</button>
            <button onClick={() => handleNavigation("/newplaylist")}>Go to New Playlist</button>
            <button onClick={() => handleNavigation("/signup")}>Go to Signup</button>
            <button onClick={() => handleNavigation("/login")}>Go to Login</button>
            <button onClick={() => handleNavigation("/home")}>Go to Home Auth</button>
            <button onClick={() => handleNavigation("/perfil")}>Go to Profile</button>
        </div>
    );
}

export default TestNavigation;
