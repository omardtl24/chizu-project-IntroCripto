import { useAuth } from "../context/authContext";

function Dash() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Dash</h1>
            <p>Usuario: {user?.displayName}</p>
            <button onClick={logout}>Cerrar sesion</button>
        </div>
    )
}

export default Dash;