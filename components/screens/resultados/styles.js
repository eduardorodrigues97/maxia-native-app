import EStyleSheet from 'react-native-extended-stylesheet';
import { general } from '../../../assets/styles/general';


const styles = EStyleSheet.create({
    ...general,

    // View
    viewCardHeader: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center'
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
    

    // Text
    textTitle: {
        ...general.textTitle,
        color: '$colors.purple',
        fontSize: '$fonts.big'
    },
    textSubtitle: {
        ...general.textGeneral,
        color: '$colors.gray',
        fontFamily: 'Medium',
        padding: 0,
        paddingVertical: '$metrics.smallPadding',
        textAlign: 'center'
    },
    textTitleBlack: {
        width: '100%',
        color: '$colors.black',
        fontSize: '$fonts.big',
        padding: 0,
        textAlign: 'left',
        marginLeft: '$metrics.bigMargin',
        fontFamily: 'Bold',
        marginTop: '$metrics.smallMargin'
    },

    // Cards
    card: {
        ...general.card,
        width: '90%',
        margin: '$metrics.veryBigMargin',
        alignItems: 'center',
        borderColor: '$colors.gray',
        borderWidth: 2,
        marginTop: '$metrics.bigMargin',
        marginBottom: '$metrics.bigMargin',
        alignItems: 'center'
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
        flex: 1
    },
})

export default styles;