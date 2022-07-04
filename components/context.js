import { React, createContext, useState } from "react";

// Authentication
export const Context = createContext();
export const StateProvider = (props) => {
    // State with auth status and username
    const [auth, setAuth] = useState(false);
    const [navigator, setNavigator] = useState('main');

    return (
        <Context.Provider value={{ 
            authState: [auth, setAuth],
            navigatorState: [navigator, setNavigator]
        }}>
            {props.children}
        </Context.Provider>
    )
}
