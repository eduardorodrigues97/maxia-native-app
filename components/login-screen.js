import React from "react";
import { Text, View, Dimensions, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import maxiaLogo from '../assets/maxia-logo-svg.png';
import loginImg from '../assets/login-img.png';
import Constants from 'expo-constants';
import { Card, Button } from "react-native-elements";

let screenDimensions = Dimensions.get('window');

const Hr = () => {
    return (
        <View style={{
            borderBottomColor: '#6c757d',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 16,
            marginBottom: 16,
            padding: 0,
            width: '90%',
            marginLeft: '5%'
        }}></View>
    )
}

const loginScreen = () => {
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
                    style={styles.container}
                >
                    <Card containerStyle={styles.cardStyle}>
                        <View style={{alignItems: "center", justifyContent:"center"}}>
                            <Image 
                                source={maxiaLogo}
                                style={styles.maxiaLogo}
                            />
                            <Text
                                style={styles.logoText}
                            >
                                Inteligência Artificial
                            </Text>
                        </View>
                    </Card>
                    <Hr />
                    <Card containerStyle={styles.cardStyle}>
                        <View style={{alignItems: "center", justifyContent:"center", flexDirection: "row"}}>
                            <Text
                                style={styles.loginText}
                            >
                                Login
                            </Text>
                            <Image 
                                source={loginImg}
                                style={styles.loginImg}
                            />
                        </View>
                        <Hr />
                        <Card containerStyle={styles.loginCardStyle}>
                            <Text
                                style={styles.loginPleaseText}
                            >
                                Para continuar, efetue o login.
                            </Text>
                        </Card>
                        <Card containerStyle={styles.textInputCard}>
                            <Text style={styles.emailSenha}>Email</Text>
                            <TextInput
                                style={styles.textInputText}
                                placeholder={'nome@email.com'}
                            />
                        </Card>
                        <Card containerStyle={styles.textInputCard}>
                            <Text style={styles.emailSenha}>Senha</Text>
                            <TextInput
                                style={styles.textInputText}
                                placeholder={'Sua Senha'}
                            />
                        </Card>
                        <Button 
                            title={'CONFIRMAR'}
                            titleStyle={{
                                color: '#fff'
                            }}
                            buttonStyle={styles.buttonStyle}
                        />
                        <Button 
                            title={'Esqueceu sua senha?'}
                            titleStyle={{
                                color: '#afafaf'
                            }}
                            buttonStyle={styles.forgotPasswordButtonStyle}
                        />
                    </Card>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default loginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight*1.4,
        backgroundColor: '#f2f2f2',
        paddingBottom: '10%'
    },
    // 
    text: {
        fontWeight: '500',
        color: '#afafaf',
        fontSize: 24,
        marginTop: 16,
        textAlign: 'center'
    },
    logoText: {
        fontWeight: '500',
        color: '#009dcc',
        fontSize: 15,
        marginTop: 16,
        textAlign: 'center'
    },
    maxiaLogo: {
        width: screenDimensions.width*0.5,
        height: screenDimensions.width*0.5*30/141,
        justifyContent: "center",
        alignItems: "center"
    },
    loginImg: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    loginText: {
        color: '#494949',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 37,
        paddingRight: 10
    },
    loginPleaseText: {
        fontWeight: 'bold',
        color: '#636464',
        fontSize: 16,
        textAlign: 'center'
    },
    textInputText: {
        fontWeight: '500',
        color: '#afafaf',
        fontSize: 16,
        textAlign: 'left',
        borderColor: '#009dcc',
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 12
    },
    emailSenha: {
        fontWeight: '700',
        color: '#009dcc',
        fontSize: 16,
        marginTop: 16,
        textAlign: 'left',
        padding: 0
    },
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
        padding: 0
    },
    buttonStyle: {
        backgroundColor: '#009dcc',
        borderRadius: 20,
        paddingVertical: 14,
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
        width: '90%',
        marginLeft: '5%',
        marginBottom: 10
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
        width: '90%',
        marginLeft: '5%',
        marginBottom: 10
    }
});
