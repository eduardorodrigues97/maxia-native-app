import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { React, useRef, useState, useEffect, useContext } from 'react';
import { Card } from 'react-native-elements'
import { SvgUri } from 'react-native-svg';

// SVG
import MaxiaSimpleLogo from '../../assets/home-screen/maxiaSimpleLogo.svg'

export const Header = () => {
    return (
        <Card containerStyle={styles.cardHeader}>
            <View style={styles.viewHeader}>
                <MaxiaSimpleLogo width='47' height='24' />
                <View style={styles.viewNotificacoes}>
                    <SvgUri width='24' height='24' uri='http://teste.maxia.education/packs/media/svg-new/icon-notificacoes-0fc9babe.svg' />
                    <Text style={styles.textNotificacoes}>okasdoksd</Text>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardHeader: {
        backgroundColor: "#fff",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        padding: 8,
        margin: 0,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    viewHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    viewNotificacoes: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
    },
    textNotificacoes: {
        color: '#6f2282',
        fontSize: 11.6,
        textAlign: 'center',
        fontFamily: 'Bold',
    }
});