import { React, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import Modal from "react-native-modal";
import { Card, Button } from 'react-native-elements';
import { Header, Hr } from './helper'
import { SvgUri } from 'react-native-svg';
import EStyleSheet from 'react-native-extended-stylesheet';
import { general } from '../assets/styles/general';
import { Modal } from 'react-native-paper';

const HomologacaoCard = (props) => {
    const { homologacao='1', serie='-', ciclo='-', data_disponivel='-', status='3',
    data_atualizacao='-', autor='-', setModalVisible } = props;
    const statusTexts = ['', 'Validação da avaliação concluída', 'Em andamento', 'Não iniciada']
    return (
        <Card containerStyle={styles.card}>
            <View style={styles.viewCardHeader}>
                <View style={styles.viewSvgHomologacao}>
                    <SvgUri uri='http://teste.maxia.education/packs/media/svg-new/ic-avaliacao-4ee6b517.svg' />
                </View>
                <View style={styles.viewCardTitle}>
                    <Text style={styles.textCardTitle}>Homologação {homologacao}</Text>
                    <Hr width='100%' margin= {0}/>
                    <View style={styles.viewCardSubtitle}>
                        <View>
                            <Text style={styles.textCardSubtitle}>{serie}</Text>
                            <Text style={styles.textCardSubtitle}>Ciclo {ciclo}</Text>
                        </View>
                        <View>
                            <Text style={styles.textCardSubtitle}>Disponível até</Text>
                            <Text style={styles.textCardSubtitlePink}>{data_disponivel}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Hr />
            <View style={styles.viewCardContent}>
                <Text style={styles.textContentBlack}>Status: </Text>
                <Text style={styles.textContentPink}>{statusTexts[status]}</Text>
            </View>
            <View style={styles.viewCardContent}>
                <Text style={styles.textContentBlack}>Última atualização: </Text>
                <Text style={styles.textContentGray}>{data_atualizacao}</Text>
            </View>
            <View style={styles.viewCardContent}>
                <Text style={styles.textContentBlack}>Por: </Text>
                <Text style={styles.textContentGray}>{autor}</Text>
            </View>
            <Hr />
            <Button 
                title={'ELABORAR'}
                titleStyle={styles.textButton}
                buttonStyle={styles.button}
                style={styles.buttonStyle}
                onPress={() => {
                    setModalVisible(true);
                }}
            />
        </Card>
    )
}

const MyModal = (props) => {
    return (
        // <Modal
        //     animationType="slide"
        //     transparent={true}
        //     visible={props.modalVisible}
        //     onBackdropPress={() => props.setModalVisible(false)}
        //     backdropColor={'black'}
        //     backdropOpacity={0.7}
        //     onRequestClose={() => {
        //         props.setModalVisible(false);
        //     }}
        // >
        <Modal visible={props.modalVisible} onDismiss={()=>props.setModalVisible(false)} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
            <View style={styles.viewModal}>
                {props.children}
            </View>
        </Modal>
    )
}

const Main = () => {
    const cards = [
        {
            homologacao: '1',
            serie: '3 serie',
            ciclo: '2',
            data_disponivel:'15 de Julho - 03h00m',
            status:'2',
            data_atualizacao:'01 de Julho - 10h59m',
            autor:'Professor Experiência'
        },
        {
            homologacao: '2',
            serie: '1 serie',
            ciclo: '1',
            data_disponivel:'04 de Julho - 04h00m',
            status:'1',
            data_atualizacao:'02 de Julho - 11h59m',
            autor:'Caça Rato CR7'
        },
        {
            homologacao: '3',
            serie: '6 ano',
            ciclo: '4',
            data_disponivel:'24 de Julho - 04h00m',
            status:'3',
            data_atualizacao:'-',
            autor:'Cronaldo'
        }
    ]
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
        
        
        <Header />

        <ScrollView style={styles.scrollViewMain}>
            <Text style={styles.textTitle}>Laboratório de Provas</Text>
            <Text style={styles.textGeneral}>O melhor lugar para elaborar suas provas</Text>
            <Hr />
            <Text style={styles.textTitle2}>Provas em produção</Text>
            <Text style={styles.textWrap}>O jeito mais rápido e simples de elaborar sua prova.</Text>

            {cards.map((item, index)=> <HomologacaoCard {...item} key={index} setModalVisible={setModalVisible}/>)}

        </ScrollView>

        <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <Text>ALOALAOLAO</Text>
            <Text>ALOALAOLAO</Text>
            <Text>ALOALAOLAO</Text>
            <Text>ALOALAOLAO</Text>
            <Text>ALOALAOLAO</Text>
            <Text>ALOALAOLAO</Text>
        </MyModal>
        </>
    )
}

const Avaliacoes = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewMain}>
                <Main />
            </View>
        </View>
    )
}

export default Avaliacoes;

const styles = EStyleSheet.create({
    ...general,

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

    // ViewModal
    viewModalBackground: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.2
    },
    viewModal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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