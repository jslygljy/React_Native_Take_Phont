import {
    PixelRatio,
    StyleSheet,
} from "react-native"

export default StyleSheet.create({
    container: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ddd'
    },
    tabWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        height: 35
    },
    tabText: {
        textAlign: 'center',
        fontSize: 15
    },
    tabActive: {
        color: '#24a8e8'
    },
    slideRegion: {
        height: 2,
        backgroundColor: 'white'
    },
    underLinePlace: {
        height: 2,
        alignItems: 'center',
    },
    tabUnderline: {
        height: 2,
        width: 70,
        backgroundColor: '#24a8e8'
    }
})
