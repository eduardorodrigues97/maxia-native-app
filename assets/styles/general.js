import Constants from 'expo-constants';

// Colors
const colors = {
    lightBlue: 'rgb(0, 157, 204)',
    black: 'rgb(73, 73, 73)',
    background: 'rgb(242, 242, 242)',
    purple: 'rgb(111, 34, 130)',
    gray: 'rgb(196, 196, 196)',
    pink: 'rgb(231, 48, 137)',
};

// Fonts
const fonts =  {
    small: 11.6,
    medium: 16,
    big: 24,
    veryBig: 30
};

// Metrics
const metrics = {
    // Margins
    smallMargin: 5,
    baseMargin: 10,
    bigMargin: 15,
    veryBigMargin: 20,

    // Paddings
    smallPadding: 5,
    basePadding: 10,
    bigPadding: 15,
    veryBigPadding: 20,

    // Basic Heights
    tabBarHeight: 54,
    paddingStatusBar: Constants.statusBarHeight*1.4,

    // Border radius
    baseRadius: 12,
    bigRadius: 20
};

const general = {
    container: {
        flex: 1,
        paddingTop: metrics.paddingStatusBar,
        backgroundColor: 'white'
    },
    viewMain: {
        flex: 1,
        backgroundColor: colors.background
    },

    // Text
    textTitle: {
        color: colors.black,
        fontSize: fonts.veryBig,
        fontFamily: 'Bold',
        alignSelf: 'center',
        padding: metrics.smallPadding
    },
    textGeneral: {
        color: 'rgb(175, 175, 175)',
        fontSize: fonts.medium,
        fontFamily: 'Medium',
        alignSelf: 'center',
        padding: metrics.smallPadding
    },
    textButton: {
        color: '#fff',
        fontFamily: 'Bold',
        margin: 0,
        padding: 0
    },
    textLogo: {
        color: colors.purple,
        fontSize: fonts.small,
        marginTop: metrics.smallMargin,
        marginBottom: 0,
        textAlign: 'center',
        fontFamily: 'Bold',
        letterSpacing: -0.3
    },
    textTextInput: {
        color: colors.black,
        fontSize: fonts.medium,
        textAlign: 'left',
        borderColor: colors.lightBlue,
        borderWidth: 2,
        borderRadius: metrics.baseRadius,
        paddingHorizontal: metrics.veryBigPadding,
        paddingVertical: metrics.basePadding,
        fontFamily: 'Medium'
    },

    // Repeated elements
    cardTextInput: {
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: metrics.baseRadius,
        borderWidth: 0,
        shadowOpacity: 0,
        padding: 0,
        margin: 0
    },
    cardHeader: {
        backgroundColor: "white",
        width: '100%',
        borderBottomEndRadius: '$metrics.bigRadius',
        borderBottomStartRadius:'$metrics.bigRadius',
        padding: '$metrics.basePadding',
        margin: 0,
        borderColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    viewHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    // Basic Elements
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        opacity: 0.2,
        marginTop: metrics.baseMargin,
        marginBottom: metrics.baseMargin,
        padding: 0
    },
    button: {
        //Background
        backgroundColor: colors.lightBlue,
        // Text
        paddingTop: metrics.bigPadding,
        paddingBottom: metrics.basePadding,
        textAlign: 'center',
        // Border
        borderRadius: 20,
        borderColor: colors.lightBlue,
        // Shadow
        shadowColor: colors.lightBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
    },
    buttonStyle: {
        paddingBottom: '$metrics.smallPadding'
    },
    card: {
        backgroundColor: "white",
        borderRadius: metrics.baseRadius,
        borderWidth: 0,
        padding: metrics.veryBigPadding,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginTop: 0
    }
};

const styles = {
    colors: colors,
    fonts: fonts,
    metrics: metrics
}

export { styles, general };