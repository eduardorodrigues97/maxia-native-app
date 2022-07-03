import { createContext, useState } from "react";

export const AuthContext = createContext();
export const StateProvider = (props) => {
    // State with auth status and username
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}