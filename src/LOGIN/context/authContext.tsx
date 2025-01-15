import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

interface AuthContextType {
    user: User | null;
    login: () => Promise<{ email: string | null, username: string | null }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Context must be used within an AuthProvider.");
    }
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ? user : null);
        });
        return () => unsubscribe();
    }, []);

    const login = async (): Promise<{ email: string | null, username: string | null }> => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        if (user) {
            const userInfo = {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL
            };
            // Esto es un ejemplo de cómo enviar la información del usuario a una función google cloud
            // try {
            //     await fetch('https://us-central1-chizu-444720.cloudfunctions.net/createUserInDbByGoogleAuth', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(userInfo)
            //     });
            //     console.log('Información del usuario enviada correctamente');
            // } catch (error) {
            //     console.error('Error al enviar la información del usuario:', error);
            // }
            return { email: user.email, username: user.displayName?.slice(0,20) ?? "chizu-user" }; // Retornamos el correo y el nombre de usuario
        }
        return { email: null, username: null };
    };
    

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
