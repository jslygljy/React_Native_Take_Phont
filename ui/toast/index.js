import Toast from "react-native-root-toast";
import {
    Dimensions,
    NativeModules
} from "react-native";

const {height} = Dimensions.get('window');
export function show(message) {
    if(NativeModules.BaseReactActivity && NativeModules.BaseReactActivity.show) {
        NativeModules.BaseReactActivity.show(message);
        return;
    }
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: false,
    });
}
