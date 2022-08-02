import EStyleSheet from 'react-native-extended-stylesheet';
import { general } from '../../../assets/styles/general';


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
    
    

    // Text
    textTitle: {
        ...general.textTitle,
        color: '$colors.purple',
        fontSize: '$fonts.big'
    },
    textInputText: {
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
        color: '#009dcc',
        fontSize: 16,
        marginTop: 16,
        textAlign: 'left',
        padding: 0,
        fontFamily: 'Bold'
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
    textInputCard: {
        backgroundColor: "$colors.background",
        borderRadius: 12,
        borderWidth: 0,
        borderColor: '#fdfdfe',
        shadowOpacity: 0,
        padding: 0,
        margin: 0,
        width: '90%'
    },
    textInputCard2: {
        backgroundColor: "$colors.background",
        borderRadius: 12,
        borderWidth: 0,
        borderColor: '#fdfdfe',
        shadowOpacity: 0,
        padding: 0,
        margin: 0,
        flex: 1
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
        margin: 15,
        width: '90%'
    },

    // ScrollView
    scrollViewMain: {
        flex: 1,
    },
})

export default styles;