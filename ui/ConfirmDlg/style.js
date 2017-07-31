import {
    StyleSheet,
    PixelRatio,
    Dimensions
} from 'react-native';

const {
    width,
    height
}  = Dimensions.get('window');

const Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -6,
        bottom: 0,
        left: -5,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        zIndex:3,
        width:width,
        height:height
    },
    modalContainer: {
        width: 270,
        backgroundColor: '#FCFCFC',
        minHeight: 120,
        borderRadius: 12,
        flexDirection: "column",
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    contentStyle: {
        color: '#030303',
        fontSize: 15
    },
    footer: {
        height: 43,
        flexDirection: 'row',
        borderTopColor: "#4d4d4d",
        borderTopWidth: 1 / PixelRatio.get()
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelBtn: {
        fontSize: 17,
        color: '#0076FF'
    },
    confirmBtn: {
        fontSize: 17,
        color: '#0076FF'
    },
    btnLeft: {
        flex: 1,
    },
    btnRight: {
        flex: 1,
        borderLeftColor: "#4d4d4d",
        borderLeftWidth: 1 / PixelRatio.get()
    },
});

export default Styles;