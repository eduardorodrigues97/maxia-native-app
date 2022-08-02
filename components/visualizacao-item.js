import { React, useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Card, Button } from 'react-native-elements';
import { Header, Hr } from './helper'
import { SvgUri } from 'react-native-svg';
import EStyleSheet from 'react-native-extended-stylesheet';
import { general } from '../assets/styles/general';
import * as SecureStore from 'expo-secure-store';

import { Context } from './context';

import { item, headers } from '../assets/item-test';
import { ouroCSS, css } from '../assets/styles/ouro-nativo';


const Main = (props) => {
    // {html: props.html.replace(/fonts/g, 'assets/fonts')}
    return (
        <View style={{flexGrow: 1, paddingHorizontal: '5%'}}>
            <WebView source = {{html: headers + item}} originWhitelist={['*']} style={{flexGrow: 1}} showsVerticalScrollIndicator={false} />
        </View>
    )
}


const VisualizarItem = ({navigation}) => {
    const [itemHtml, setItemHtml] = useState('');
    //console.log(item)

    // Auth Checker
    const getItem = async (item_id) => {
        try {
            let token = await SecureStore.getItemAsync('maxiaSessionToken');
            const response = await fetch('https://native-app-dev-7rbjwj4yoa-rj.a.run.app/get_item', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    item_id: item_id
                })
            });
            const json = await response.json();
            setItemHtml(json['item_complete_html'])
            
        } catch (error) {
            
            console.log(error)
        }
    }

    useEffect(() => {
        getItem(14061);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.viewMain}>
            <>
                <Header />
                <Main html={itemHtml} />
            </>
            </View>
        </View>
    )
}

export default VisualizarItem;

const styles = EStyleSheet.create({
    ...general,

    viewWebView: {},

    // View
    viewCardHeader: {
        flexDirection: 'row',
        width: '100%'
    },
    viewSvgHomologacao: {
        padding: '$metrics.basePadding',
        paddingLeft: 0,
        alignItems: 'center'
    },
    viewCardTitle: {
        flexGrow: 1
    },
    viewCardSubtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewCardContent: {
        flexDirection: 'row'
    },
    viewMain: {flex: 1, height: '100%'},

    // ViewModal
    viewModalBackground: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.2
    },
    
    

    // Text
    textTitle: {
        ...general.textTitle,
        paddingTop: '$metrics.veryBigPadding'
    },
    textTitle2: {
        ...general.textTitle,
        paddingTop: '$metrics.smallPadding'
    },
    textWrap: {
        ...general.textGeneral,
        width: '80%',
        textAlign: 'center'
    },
    textCardTitle: {
        ...general.textGeneral,
        color: '$colors.pink',
        fontFamily: 'Bold',
        width: '100%',
        textAlign: 'left',
        padding: 0
    },
    textCardSubtitle: {
        ...general.textGeneral,
        color: '$colors.black',
        padding: 0
    },
    textCardSubtitlePink: {
        ...general.textGeneral,
        color: '$colors.pink',
        padding: 0
    },
    textContentBlack: {
        ...general.textGeneral,
        color: '$colors.black',
        fontFamily: 'Regular',
        padding: 0,
        paddingVertical: '$metrics.smallPadding'
    },
    textContentPink: {
        ...general.textGeneral,
        color: '$colors.pink',
        fontFamily: 'Regular',
        padding: 0,
        paddingVertical: '$metrics.smallPadding'
    },
    textContentGray: {
        ...general.textGeneral,
        color: '$colors.gray',
        fontFamily: 'Regular',
        padding: 0,
        paddingVertical: '$metrics.smallPadding'
    },

    // Cards
    card: {
        ...general.card,
        margin: '$metrics.veryBigMargin',
        alignItems: 'center',
        borderColor: '$colors.gray',
        borderWidth: 2,
        marginTop: '$metrics.bigMargin',
        marginBottom: '$metrics.bigMargin'
    },

    // ScrollView
    scrollViewMain: {
        flex: 1
    },
})