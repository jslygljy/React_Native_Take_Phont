import {StyleSheet, PixelRatio, Platform} from 'react-native';
import {HEADER_BAR_HEIGHT} from 'constants/styles';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: HEADER_BAR_HEIGHT + 20,
        marginTop: (Platform.OS === 'ios') ? -2 : -20,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#dddddd'
    },
    headerBackPart: {
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 15,
        width: 50
    },
    headerPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20,
    },
    headerRight: {
        paddingTop: 20,
        paddingRight: 15,
        width: 50,
    }
});
