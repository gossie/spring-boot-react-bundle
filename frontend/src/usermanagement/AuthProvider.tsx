import {ReactNode, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {useNavigate} from "react-router-dom";

export default function AuthProvider({children}:{children :ReactNode}) {
    const nav = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('jwt') ?? '');
    const [roles, setRoles] = useState<string[]>([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log("rerender")
        if (token) {
            const decoded = window.atob(token.split('.')[1]);
            const decodeJWT = JSON.parse(decoded);
            setUsername(decodeJWT.sub);
            setRoles(decodeJWT.roles)
        }
    }, [token, nav]);

    console.log("In AuthProvider Body");

    const logout = () => {
        console.log("logout")
        localStorage.removeItem('jwt');
        setToken('');
        setRoles([]);
        setUsername('');
        nav("/");
    };

    const login = (gotToken: string) => {
        localStorage.setItem('jwt', gotToken);
        setToken(gotToken);
    };

    return <AuthContext.Provider value={{token, roles, username, logout, login}} >{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);