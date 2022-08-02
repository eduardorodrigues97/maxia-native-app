import { React, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Header, Hr, TextHr } from '../../helper'
import { SvgUri } from 'react-native-svg';
import styles from './styles';

import { Context } from '../../context';

const Main = () => {
    return (
<>
<View style={{alignItems: 'center', flex: 1, paddingTop: 20, width: '100%', paddingBottom: 50}}>
    <SvgUri width={59} height={59} uri={'http://teste.maxia.education/packs/media/svg-new/settings-497e6128.svg'} />
    <Text style={styles.textTitle}>Configurações</Text>
    <Hr width={'90%'} margin={'0%'} />
    <TextHr>
        <Text>Pessoal</Text>
    </TextHr>
    <Card containerStyle={styles.textInputCard}>
        <Text style={styles.emailSenha}>Nome Completo</Text>
        <TextInput
            style={styles.textInputText}
            placeholder={'Nome'}
            placeholderTextColor={'#afafaf'}
            autoCapitalize={'true'}
            autoComplete={'name'}
            autoCorrect={false}
            autoFocus={true}
            selectTextOnFocus={true}
            returnKeyType={'next'}
            blurOnSubmit={false}
        />
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
            blurOnSubmit={false}
        />
    </Card>
    <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}} >
        <Card containerStyle={styles.textInputCard2}>
            <Text style={styles.emailSenha}>Telefone</Text>
            <TextInput
                style={styles.textInputText}
                placeholder={'Telefone'}
                placeholderTextColor={'#afafaf'}
                autoCapitalize={'none'}
                autoComplete={'none'}
                autoCorrect={false}
                autoFocus={true}
                selectTextOnFocus={true}
                keyboardType={'phone'}
                returnKeyType={'next'}
                blurOnSubmit={false}
            />
        </Card>
        <View style={{flex: 0.2}}></View>
        <Card containerStyle={styles.textInputCard2}>
            <Text style={styles.emailSenha}>Data de nascimento</Text>
            <TextInput
                style={styles.textInputText}
                placeholder={'Data'}
                placeholderTextColor={'#afafaf'}
                autoCapitalize={'none'}
                autoComplete={'none'}
                autoCorrect={false}
                autoFocus={true}
                selectTextOnFocus={true}
                keyboardType={'date'}
                returnKeyType={'next'}
                blurOnSubmit={false}
            />
        </Card>
    </View>
    <TextHr>
        <Text>Geral</Text>
    </TextHr>
    <Text>COLÉGIO CÔNEGO</Text>
    <Text>Disciplinas que ministra: </Text>
    <Button 
        title={'EDITAR DISCIPLINAS'}
        titleStyle={{
            color: '#fff',
            fontFamily: 'Bold'
        }}
        buttonStyle={{...styles.buttonStyle, backgroundColor: '#6f2282', shadowColor: '#6f2282'}}
        containerStyle={{width: '100%'}}
        // onPress={authenticate}
    />
    <TextHr>
        <Text>Geral</Text>
    </TextHr>
    <Button 
        title={'MUDAR SENHA'}
        titleStyle={{
            color: '#fff',
            fontFamily: 'Bold'
        }}
        buttonStyle={styles.buttonStyle}
        containerStyle={{width: '100%'}}
        // onPress={authenticate}
    />
    <Hr width={'90%'} margin={'0%'} />
    <Text style={{color: 'red', textDecorationLine: 'underline'}}>Sair</Text>
</View>

</>
    )
}

const Config = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewMain}>
            <>
                <Header />
                <ScrollView style={styles.scrollViewMain}>
                    <Main />
                </ScrollView>
            </>
            </View>
        </View>
    )
}

export default Config;
