import React from 'react';
import { Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import EStyleSheet from 'react-native-extended-stylesheet';
import { general } from '../assets/styles/general';
import { Card } from 'react-native-elements';

// SVG
import MaxiaSimpleLogo from '../assets/home-screen/maxiaSimpleLogo.svg'

const Header = () => {
    return (
        <Card containerStyle={styles.cardHeader}>
            <View style={styles.viewHeader}>
                <View style={styles.viewSimpleMaxiaLogo}>
                    <MaxiaSimpleLogo width='47' height='24' />
                </View>
                <View style={styles.viewNotificacoes}>
                    <SvgUri width='24' height='24' uri='http://teste.maxia.education/packs/media/svg-new/icon-notificacoes-0fc9babe.svg' />
                    <Text style={styles.textNotificacoes}>Notificações</Text>
                </View>
            </View>
        </Card>
    )
}

const Hr = (props) => {
    const {width = '90%', margin = '5%'} = props;
    return (
        <View style={{
            ...styles.hr,
            width: width,
            marginLeft: margin
        }}></View>
    )
}

const HrNew = (props) => {
    const {width = '100%'} = props;
    return (
        <View style={{
            ...styles.hr,
            width: width
        }}></View>
    )
}

const TextHr = (props) => {
    return (
        <View style={styles.viewTextHr}>
            <View style={{flexGrow: 1}}>
                <View style={{borderWidth: 2, marginRight: 15, opacity: 0.2}}></View>
            </View>
            {props.children}
            <View style={{flexGrow: 1}}>
                <View style={{borderWidth: 2, marginLeft: 15, opacity: 0.2}}></View>
            </View>
        </View>
    )

}

export { Header, Hr, TextHr, HrNew };

const styles = EStyleSheet.create({
    ...general,

    // Views
    viewNotificacoes: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewSimpleMaxiaLogo: {
        padding: '$metrics.smallPadding',
        alignItems: 'flex-end'
    },
    viewTextHr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        flex: 1
    },

    // Texts
    textNotificacoes: {
        fontSize: '$fonts.small',
        color: '$colors.black',
        fontFamily: 'Medium',
        padding: '$metrics.smallPadding'
    },
})