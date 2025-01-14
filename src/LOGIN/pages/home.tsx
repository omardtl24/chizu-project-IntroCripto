import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


function Home() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dash');
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Home</h1> 
            {user ? (<p> Redirigiendo a el dash</p>) : (
                <button onClick={login}>Login con google</button>
            )}
        </div>
    )
}


export default Home;