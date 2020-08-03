import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

//--------COLOR SHEMA--------//

//Header
const HeaderTextColor = '#dcddde'
const HeaderBackground = '#2d3235'
//styles (general)
const backgroundColor = '#343a3f'
const textColor = '#dcddde'
const ButtonColor = '#718bd7'
const inputBackground = '#272c2f'
const inputBorder = '#292b2f'
const ButtonTextColor = '#dcddde'
//ResultHeader (texte original + note)
const resultHBackground = '#718bd7'
const resultHTextColor = '#dcddde'
//Card
const cardButtonColor = '#718bd7'
const cardBackgroundColor = '#475057'
const cardIndicationTextColor = '#71777e'
const cardButtonIconColor = '#dcddde'
const cardFinalTextColor = '#dcddde'
//Loader
const LoaderBackground = '#dcddde'

//--------STYLESHEETS-------//

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    inputContainer: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    textInput: {
        height: 50,
        borderRadius: 15,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        marginVertical: 5,
        color: textColor,
        borderWidth: 2,
        backgroundColor: inputBackground,
        borderColor: inputBorder
    },
    textInputNumber: {
        width: '30%',
        textAlign: 'center',
    },
    textInputText: {
        textAlignVertical: 'top',
        width: '80%',
        paddingTop: 13,
        paddingBottom: 13,
        height: 200,
        minHeight: 50,
        maxHeight: 200,
    },
    button: {
        height: 50,
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: ButtonColor,
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: ButtonTextColor,
        fontWeight: '700',
        fontSize: 16
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const stylesCard = StyleSheet.create({
    container: {
        backgroundColor: cardBackgroundColor,
        margin: 10,
        padding: 10,
        borderRadius: 20
    },
    informationsContainer: {
        paddingHorizontal: 10,
        paddingTop: 5
    },
    informationsText: {
        color: cardIndicationTextColor
    },
    finalText: {
        color: cardFinalTextColor
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 5
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: cardButtonColor,
        borderRadius: 15,
    },
    icon: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
})

const stylesLoader = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerform: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: LoaderBackground,
        borderRadius: 25,
        width: 100,
        height: 100
    }
})

const stylesHeader = {
    HeaderTextColor: HeaderTextColor,
    HeaderBackground: HeaderBackground,

}

const styleResultHeader = {
    container: {
        backgroundColor: resultHBackground,
        marginBottom: 0,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    subContainer: {
        paddingHorizontal: 10,
        paddingTop: 5
    },
    text: {
        color: resultHTextColor,
        textAlign: 'center'
    },
    markContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    }
}

export { styles, stylesCard, stylesLoader, stylesHeader, styleResultHeader, cardButtonIconColor }