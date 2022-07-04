import { React, createContext, useState } from "react";

// Authentication
export const Context = createContext();
export const StateProvider = (props) => {
    // State with auth status and username
    const [auth, setAuth] = useState(false);

    return (
        <Context.Provider value={{ 
            authState: [auth, setAuth]
        }}>
            {props.children}
        </Context.Provider>
    )
}
