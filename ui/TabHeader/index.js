import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import styles from './styles'
const {width} = Dimensions.get('window');

export default class TabHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: this.props.activeIndex,
            fadeAnim: new Animated.Value(0),
        }
    }

    static defaultProps = {
        items: [],
        activeIndex: 0
    }

    static propTypes = {
        tabStyle: PropTypes.object,
        items: PropTypes.array,
        activeIndex: PropTypes.number,
        onTabChanged: PropTypes.func
    }

    componentWillMount() {
        const {items} = this.props;
        this.itemNum = items.length;
        this.inputRange = [];
        this.outputRange = [];
        for (let i = 0; i < items.length; i++) {
            this.inputRange.push(i);
            this.outputRange.push(width / this.itemNum * i);
        }
    }

    onTabClick(activeIndex) {
        this.setState({
            activeIndex
        });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: activeIndex,
                useNativeDriver: true
            }
        ).start();
        const {
            onTabChanged
        } = this.props;
        onTabChanged && onTabChanged(activeIndex);
    }

    renderTabs() {
        const {items} = this.props
        const {activeIndex} = this.state
        return items.map((item, index) => {
            return (
                <TouchableOpacity style={styles.tab} key={index}
                                  onPress={this.onTabClick.bind(this, index)}>
                    <Text style={[styles.tabText, activeIndex === index ? styles.tabActive : null]}>
                        { item }
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    render() {
        const slide = {
            transform: [{
                translateX: this.state.fadeAnim.interpolate({
                    inputRange: this.inputRange,
                    outputRange: this.outputRange
                })
            }]
        };
        const tabStyle = this.props.tabStyle
        return (
            <View style={[styles.container, tabStyle]}>
                <View style={styles.tabWrapper}>
                    {this.renderTabs()}
                </View>
                <View style={styles.slideRegion}>
                    <Animated.View style={slide}>
                        <View style={[styles.underLinePlace, {width: width / this.itemNum}]}>
                            <View style={styles.tabUnderline}/>
                        </View>
                    </Animated.View>
                </View>
            </View>
        )
    }
}
