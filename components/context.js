import { React, createContext, useState } from "react";
import { Text } from "react-native-elements";

export const Context = createContext();
export const StateProvider = (props) => {
    // State with auth status and username
    const [auth, setAuth] = useState(false);
    const [navigationStatus, setNavigationStatus] = useState('CentralAvaliacoes');
    const [modalChildren, setModalChildren] = useState('abcde');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Context.Provider value={{
            authContext: [auth, setAuth],
            navigationContext: [navigationStatus, setNavigationStatus],
            modalContext: [modalChildren, setModalChildren, modalVisible, setModalVisible]
            }}>
            {props.children}
        </Context.Provider>
    )
}