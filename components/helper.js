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

export { Header, Hr };

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

    // Texts
    textNotificacoes: {
        fontSize: '$fonts.small',
        color: '$colors.black',
        fontFamily: 'Medium',
        padding: '$metrics.smallPadding'
    },
})