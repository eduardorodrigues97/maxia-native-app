// import React from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Card, Button } from "react-native-elements";
import { SvgXml } from 'react-native-svg';
import { React, useRef, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Hr = (props) => {
    return (
        <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            opacity: 0.2,
            marginTop: 16,
            marginBottom: 16,
            padding: 0,
            width: props.width,
            marginLeft: props.margin
        }}></View>
    )
}

async function save(key, value) {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log('Saved succesfully')
    } catch (error) {
        console.log('Could not save variable')
    }
}

let usersTable = {
    'eduardo.rodrigues': 'senha'
}

export default function LoginScreen({ navigation }) {
    // Set states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('Para continuar, efetue o login.');

    // Set Refs
    const emailInput = useRef();
    const passwordInput = useRef();

    // Define auxiliary functions
    async function authenticationRequest() {
        try {
            let email = await SecureStore.getItemAsync('email');
            let password = await SecureStore.getItemAsync('password');
            if (email in usersTable) {
                if (usersTable[email] === password) {
                    setLoginStatus("Para continuar, efetue o login.")
                    navigation.navigate('MainApp');
                }
                else {
                    // Username exists, but wrong password
                    setLoginStatus("Senha errada.")
                }
            } else {
                // Username does not exist
                setLoginStatus("Email não encontrado.")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const authenticate = () => {
        save('email', email)
        save('password', password)
        authenticationRequest()
        return
    }

    // Try to authenticate right away, before rendering the very first time
    useEffect(() => {
        authenticationRequest()
    }, [])

    // Component
    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1, backgroundColor: '#f2f2f2'}}
        keyboardVerticalOffset = {0}
    >
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            <View
                style={{...styles.container}}
            >
                <Card containerStyle={styles.cardStyle}>
                    <View style={{alignItems: "center", justifyContent:"center"}}>
                        <SvgXml width="141" height="30" xml={styles.maxiaLogoSvg.xml} />
                        <Text
                            style={styles.logoText}
                        >
                            Inteligência Artificial
                        </Text>
                    </View>
                </Card>
                <Hr width={'90%'} margin={'5%'}/>
                <Card containerStyle={styles.cardStyle}>
                    <View style={{alignItems: "center", justifyContent:"center", flexDirection: "row"}}>
                        <Text
                            style={styles.loginText}
                        >
                            Login
                        </Text>
                        <SvgXml width="24" height="24" xml={styles.loginImgSvg.xml} />
                    </View>
                    <Hr width={'100%'} margin={'0%'}/>
                    <Card containerStyle={styles.loginCardStyle}>
                        <Text
                            style={styles.loginPleaseText}
                        >
                            {loginStatus}
                        </Text>
                    </Card>
                    <Card containerStyle={styles.textInputCard}>
                        <Text style={styles.emailSenha}>Email</Text>
                        <TextInput
                            style={styles.textInputText}
                            placeholder={'nome@email.com'}
                            placeholderTextColor={'#afafaf'}
                            autoCapitalize={'none'}
                            autoComplete={'email'}
                            autoCorrect={false}
                            autoFocus={true}
                            selectTextOnFocus={true}
                            keyboardType={'email-address'}
                            returnKeyType={'next'}
                            onSubmitEditing={() => passwordInput.current.focus()}
                            onChangeText={(value) => setEmail(value)}

                            // onSubmitEditing Check for mistypes and focus the password
                            // onEndEditing Check mistypes
                            blurOnSubmit={false}

                            ref={emailInput}
                        />
                    </Card>
                    <Card containerStyle={styles.textInputCard}>
                        <Text style={styles.emailSenha}>Senha</Text>
                        <TextInput
                            style={styles.textInputText}
                            placeholder={'Sua Senha'}
                            placeholderTextColor={'#afafaf'}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            selectTextOnFocus={true}
                            returnKeyType={'done'}
                            onSubmitEditing={() => authenticate()}
                            onChangeText={(value) => setPassword(value)}

                            ref={passwordInput}
                        />
                    </Card>
                    <Button 
                        title={'CONFIRMAR'}
                        titleStyle={{
                            color: '#fff',
                            fontFamily: 'Bold',
                            fontWeight: '400'
                        }}
                        buttonStyle={styles.buttonStyle}
                        onPress={authenticate}
                    />
                    <Button 
                        title={'Esqueceu sua senha?'}
                        titleStyle={{
                            color: '#afafaf',
                            fontFamily: 'Regular',
                            fontWeight: '400'
                        }}
                        buttonStyle={styles.forgotPasswordButtonStyle}
                    />
                </Card>
                <Hr width={'90%'} margin={'5%'}/>
                <Card containerStyle={styles.helpCard}>
                    <Text 
                        style={{
                            color: '#fff',
                            fontFamily: 'Bold',
                            fontSize: 16,
                            marginTop: 5
                        }}
                    >
                        Precisa de ajuda?
                    </Text>
                    <Text 
                        style={{
                            color: '#6c757d',
                            fontFamily: 'Regular',
                            fontSize: 16,
                            marginTop: 5,
                            marginBottom: 15
                        }}
                    >
                        Contate nosso suporte
                    </Text>
                </Card>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    // Global Container
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight*1.4,
        backgroundColor: '#f2f2f2',
        paddingBottom: '10%'
    },

    // Text
    text: {
        fontWeight: '500',
        color: '#afafaf',
        fontSize: 24,
        marginTop: 16,
        textAlign: 'center',
        fontFamily: 'Medium'
    },
    logoText: {
        fontWeight: '500',
        color: '#009dcc',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 7,
        textAlign: 'center',
        fontFamily: 'Medium'
    },
    loginText: {
        color: '#494949',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 37,
        paddingRight: 10,
        fontFamily: 'Bold'
    },
    loginPleaseText: {
        fontWeight: 'bold',
        color: '#636464',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Bold'
    },
    textInputText: {
        fontWeight: '500',
        color: '#494949',
        fontSize: 16,
        textAlign: 'left',
        borderColor: '#009dcc',
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 12,
        fontFamily: 'Medium'
    },
    emailSenha: {
        fontWeight: '700',
        color: '#009dcc',
        fontSize: 16,
        marginTop: 16,
        textAlign: 'left',
        padding: 0,
        fontFamily: 'Bold'
    },

    // Cards
    cardStyle: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 0,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginTop: 0
    },
    loginCardStyle: {
        backgroundColor: "#fefefe",
        borderRadius: 12,
        borderWidth: 0,
        borderColor: '#fdfdfe',
        padding: 20,
        shadowOpacity: 0,
        marginTop: 0,
        paddingBottom: 0
    },
    textInputCard: {
        backgroundColor: "#fefefe",
        borderRadius: 12,
        borderWidth: 0,
        borderColor: '#fdfdfe',
        shadowOpacity: 0,
        padding: 0,
        margin: 0
    },
    helpCard: {
        backgroundColor: "#6f2282",
        borderRadius: 12,
        borderWidth: 0,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginTop: 0
    },

    // Buttons
    buttonStyle: {
        backgroundColor: '#009dcc',
        borderRadius: 20,
        paddingTop: 14,
        paddingBottom: 11,
        borderColor: '#009dcc',
        textAlign: 'center',
        shadowColor: '#0087b1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
        color: '#afafaf',
        fontSize: 16,
        marginTop: 16,
        fontWeight: '500',
        marginBottom: 10,
        fontFamily: 'Regular'
    },
    forgotPasswordButtonStyle: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        textAlign: 'center',
        color: '#c4c4c4',
        fontSize: 16,
        marginTop: 10,
        paddingBottom: 0,
        fontWeight: '400',
        marginBottom: 10
    },

    // Images
    loginImgSvg: {
        xml: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#494949" class="ms-2 text-black-1" viewBox="0 0 16 16" data-inject-url="http://teste.maxia.education/packs/media/bootstrap-icons/person-circle-b987e009.svg">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
        </svg>
      `
    },
    maxiaLogoSvg: {
        xml: `<svg xmlns="http://www.w3.org/2000/svg" width="141" height="30" viewBox="0 0 141 30" fill="none">
        <path d="M65.5726 16.0946C65.5726 15.2927 66.0781 14.8221 66.758 14.8221C67.4378 14.8221 67.9433 15.3102 67.9433 16.0946V16.4955H67.9782C68.7103 15.3799 69.9479 14.6478 71.7957 14.6478C73.6783 14.6478 75.0379 15.4496 75.77 16.7744H75.8049C76.7113 15.5019 78.071 14.6478 80.2151 14.6478C83.283 14.6478 85.0784 16.5827 85.0784 19.7726V27.4425C85.0784 28.2443 84.5729 28.715 83.8931 28.715C83.2133 28.715 82.7078 28.2269 82.7078 27.4425V20.3304C82.7078 18.1341 81.7142 16.8616 79.6573 16.8616C77.8095 16.8616 76.537 18.1689 76.537 20.191V27.4425C76.537 28.2443 76.0315 28.715 75.3517 28.715C74.6719 28.715 74.1663 28.2269 74.1663 27.4425V20.3304C74.1663 18.1341 73.1728 16.8616 71.1158 16.8616C69.2681 16.8616 67.9956 18.1689 67.9956 20.191V27.4425C67.9956 28.2443 67.4901 28.715 66.8103 28.715C66.1304 28.715 65.6249 28.2269 65.6249 27.4425V16.0946H65.5726Z" fill="#73308A"/>
        <path d="M100.749 27.5819C100.749 28.2443 100.244 28.7149 99.5291 28.7149C99.1107 28.7149 98.7621 28.5232 98.4832 28.1223L97.9428 27.2681H97.908C97.0015 28.2966 95.7116 28.8892 93.7244 28.8892C90.6913 28.8892 88.9133 27.3901 88.9133 24.7929C88.9133 21.9864 90.8482 20.5919 94.2299 20.5919H97.3327C97.4547 20.5919 97.507 20.5396 97.507 20.4176V19.7552C97.507 17.8551 96.618 16.7744 94.2299 16.7744C93.184 16.7744 92.1033 17.123 91.4409 17.4542C91.2143 17.5762 90.9528 17.646 90.7611 17.646C90.1335 17.646 89.7326 17.245 89.7326 16.6175C89.7326 16.2514 89.9069 15.8854 90.3078 15.6588C91.162 15.0835 92.5739 14.6303 94.4565 14.6303C98.0997 14.6303 99.808 16.356 99.808 19.7203V24.6185C99.808 25.3332 99.8603 25.6121 100.069 26.0131L100.558 26.9021C100.662 27.0938 100.749 27.3553 100.749 27.5819ZM97.507 24.1653V22.6662C97.507 22.5442 97.4547 22.4919 97.3327 22.4919H94.596C92.2602 22.4919 91.2143 23.1717 91.2143 24.7057C91.2143 26.1351 92.2427 26.8323 94.0556 26.8323C96.1648 26.8498 97.507 25.8562 97.507 24.1653Z" fill="#73308A"/>
        <path d="M112.202 28.1223L108.872 23.3983H108.838L105.526 28.1223C105.212 28.5406 104.863 28.7149 104.48 28.7149C103.852 28.7149 103.434 28.2094 103.434 27.669C103.434 27.3901 103.521 27.1287 103.713 26.8498L107.53 21.4809L104.131 16.6698C103.957 16.4083 103.852 16.1643 103.852 15.8679C103.852 15.2927 104.271 14.8221 104.898 14.8221C105.299 14.8221 105.665 14.9964 105.944 15.3973L108.838 19.5634H108.872L111.801 15.3799C112.08 14.9789 112.463 14.8046 112.847 14.8046C113.439 14.8046 113.875 15.2927 113.875 15.8505C113.875 16.1294 113.753 16.3909 113.596 16.6524L110.215 21.4634L114.032 26.8323C114.224 27.1112 114.311 27.3727 114.311 27.6516C114.311 28.192 113.858 28.6975 113.265 28.6975C112.847 28.7149 112.481 28.5581 112.202 28.1223Z" fill="#73308A"/>
        <path d="M123.166 9C124.212 9 125.066 9.85414 125.066 10.9C125.066 11.9459 124.212 12.8001 123.166 12.8001C122.12 12.8001 121.266 11.9459 121.266 10.9C121.266 9.85414 122.12 9 123.166 9ZM121.58 27.0416V16.4084C121.58 15.3625 122.242 14.735 123.166 14.735C124.107 14.735 124.752 15.3625 124.752 16.4084V27.0416C124.752 28.0875 124.09 28.715 123.166 28.715C122.242 28.715 121.58 28.0875 121.58 27.0416Z" fill="#00A6CE"/>
        <path d="M140.72 27.2507C140.72 28.1049 140.04 28.7324 139.133 28.7324C138.558 28.7324 138.105 28.5406 137.791 28.07L137.338 27.3902H137.303C136.501 28.3315 135.107 28.8893 133.259 28.8893C130.017 28.8893 128.291 27.3553 128.291 24.7406C128.291 21.7772 130.365 20.3653 133.747 20.3653H136.554C136.676 20.3653 136.728 20.313 136.728 20.191V19.8423C136.728 18.2561 135.821 17.3148 133.66 17.3148C132.701 17.3148 131.76 17.5937 131.15 17.89C130.871 18.012 130.575 18.0643 130.33 18.0643C129.564 18.0643 129.023 17.5588 129.023 16.757C129.023 16.3038 129.25 15.7982 129.825 15.5019C130.714 14.9964 132.126 14.5606 134.009 14.5606C137.896 14.5606 139.743 16.4955 139.743 19.8772V24.2002C139.743 24.9149 139.831 25.1938 140.022 25.5599L140.441 26.292C140.632 26.6232 140.72 26.9369 140.72 27.2507ZM136.728 24.1479V22.9277C136.728 22.8057 136.676 22.7534 136.554 22.7534H134.287C132.178 22.7534 131.324 23.3461 131.324 24.6011C131.324 25.7342 132.143 26.3094 133.712 26.3094C135.577 26.3094 136.728 25.5947 136.728 24.1479Z" fill="#00A6CE"/>
        <path d="M117.153 22.4923C117.923 22.4923 118.547 21.8679 118.547 21.0976C118.547 20.3274 117.923 19.7029 117.153 19.7029C116.382 19.7029 115.758 20.3274 115.758 21.0976C115.758 21.8679 116.382 22.4923 117.153 22.4923Z" fill="#73308A"/>
        <path d="M28.6876 19.2403C27.7463 19.2403 26.8224 18.8045 26.2472 17.9678L16.9562 4.68499C16.0149 3.34277 16.3461 1.4776 17.6883 0.536305C19.0305 -0.404994 20.8957 -0.0737965 21.837 1.26843L31.128 14.5512C32.0693 15.8934 31.7381 17.7586 30.3959 18.6999C29.8729 19.066 29.2802 19.2403 28.6876 19.2403Z" fill="#00A6CE"/>
        <path d="M54.3991 29.4377C53.4578 29.4377 52.5339 29.0019 51.9587 28.1652L35.5382 4.68499C34.5969 3.34277 34.9281 1.4776 36.2703 0.536305C37.6126 -0.404994 39.4777 -0.0737965 40.419 1.26843L56.8395 24.7486C57.7808 26.0908 57.4496 27.956 56.1074 28.8973C55.5844 29.2634 54.9743 29.4377 54.3991 29.4377Z" fill="#73308A"/>
        <path d="M21.5581 29.4377C20.9654 29.4377 20.3728 29.2634 19.8498 28.8973C18.5076 27.956 18.1764 26.0908 19.1177 24.7486L35.5381 1.26843C36.4794 -0.0737965 38.3446 -0.404994 39.6868 0.536305C41.029 1.4776 41.3602 3.34277 40.4189 4.68499L23.9985 28.1652C23.4233 28.9845 22.4994 29.4377 21.5581 29.4377Z" fill="#73308A"/>
        <path d="M35.8172 29.4377C34.8759 29.4377 33.952 29.0019 33.3768 28.1652L30.8143 24.4871C29.8731 23.1449 30.2043 21.2798 31.5465 20.3385C32.8887 19.3972 34.7539 19.7284 35.6952 21.0706L38.2576 24.7486C39.1989 26.0908 38.8677 27.956 37.5255 28.8973C37.0025 29.2634 36.4099 29.4377 35.8172 29.4377Z" fill="#73308A"/>
        <path d="M2.97668 29.438C2.38401 29.438 1.79134 29.2636 1.2684 28.8976C-0.0738271 27.9563 -0.405025 26.0911 0.536274 24.7489L16.9567 1.2687C17.898 -0.0735218 19.7632 -0.40472 21.1054 0.53658C22.4476 1.47788 22.7788 3.34305 21.8375 4.68527L5.43451 28.1655C4.84185 28.9847 3.91798 29.438 2.97668 29.438Z" fill="#73308A"/>
        </svg>`
    }
});
