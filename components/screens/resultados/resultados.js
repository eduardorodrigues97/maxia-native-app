import { React, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Header, Hr, TextHr, HrNew } from '../../helper'
import { SvgUri } from 'react-native-svg';
import styles from './styles';

import { Context } from '../../context';

const CardResultados = () => {
    return (
        <Card containerStyle={styles.card}>
            <View style={styles.viewCardHeader}>
                <SvgUri uri='http://teste.maxia.education/packs/media/svg-new/ic-avaliacao-4ee6b517.svg' />
                <Text>3 ano</Text>
                <Text>Ciclo 1</Text>
            </View>
            <Hr />
            <View style={styles.viewCardContent}>
                <Text style={styles.textContentBlack}>Status: </Text>
                <Text style={styles.textContentPink}>status</Text>
            </View>
            <View style={styles.viewCardContent}>
                <Text style={styles.textContentBlack}>Última atualização: </Text>
                <Text style={styles.textContentGray}>data</Text>
            </View>
            <View style={styles.viewCardContent}>
                <Text style={styles.textContentBlack}>Por: </Text>
                <Text style={styles.textContentGray}>autor</Text>
            </View>
        </Card>
    )
}

const Main = () => {
    return (
<View style={{width: '90%', alignItems: 'center'}}>
<Text style={styles.textTitle}>Central de Resultados</Text>
<Text style={styles.textSubtitle}>Nessa central você analisa a fundo o desempenho das suas turmas nas avaliações aplicadas.</Text>
<HrNew />
<Text style={styles.textTitleBlack}>Mais Recente</Text>
<CardResultados />
</View>
    )
}

const Resultados = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewMain}>
            <>
                <Header />
                <ScrollView style={styles.scrollViewMain} contentContainerStyle={{alignItems: 'center', paddingTop: 20}}>
                    <Main />
                </ScrollView>
            </>
            </View>
        </View>
    )
}

export default Resultados;
