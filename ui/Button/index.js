import React, {
    Component,
    PropTypes
} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    PixelRatio,
} from 'react-native';
import Styles from './style';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }


    getBackgroundStyle() {
        const {
            bgStyle
        } = this.props;
        const {
            borderColor,
            backgroundColor,
            borderRadius,
            width,
            height,
            borderWidth,
        } = bgStyle;
        return {
            width,
            height,
            borderColor,
            backgroundColor,
            borderRadius,
            borderWidth: borderWidth || 1 / PixelRatio.get()
        };
    }

    render() {
        const {
            text,
            txtStyle,
            callback,
            disabled,
        } = this.props;
        return (
            <TouchableOpacity style={[Styles.container, this.getBackgroundStyle()]} onPress={callback} disabled={disabled}>
                <Text style={[txtStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func,
    txtStyle: PropTypes.object,
    bgStyle: PropTypes.object,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    callback: () => {
        console.log('callback')
    },
    txtStyle: {
        fontSize: 18,
        color: '#FFF'
    },
    bgStyle: {
        borderColor: '#24A8E8',
        backgroundColor: '#24A8E8',
        borderRadius: 4,
        width: 100,
        height: 35
    },
    disabled: false,
};