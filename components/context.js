import { React, createContext, useState } from "react";

export const Context = createContext();
export const StateProvider = (props) => {
    // State with auth status and username
    const [auth, setAuth] = useState(false);
    const [navigationStatus, setNavigationStatus] = useState('CentralAvaliacoes');

    return (
        <Context.Provider value={{
            authContext: [auth, setAuth],
            navigationContext: [navigationStatus, setNavigationStatus]
            }}>
            {props.children}
        </Context.Provider>
    )
}