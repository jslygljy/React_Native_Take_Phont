import React, {Component} from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import ChangInfo from '../../components/ChangInfo';


export default class BackableHeader extends Component {
    render() {
        return (
            <View style={styles.header}>
                {
                    !this.props.set &&
                    <TouchableOpacity onPress={this.handlerBackBtnClick.bind(this) }
                                      style={styles.headerBackPart}>
                        <Image source={require('../../assets/back.png') }
                               style={{height: 20, width: 11}}/>
                    </TouchableOpacity>
                }

                {
                    this.props.set &&
                    <TouchableOpacity onPress={this.handlersetBtnClick.bind(this) }
                                      style={styles.headerBackPart}>
                        <Image source={require('../../assets/set.png') }
                               style={{height: 18, width: 18,}}/>
                    </TouchableOpacity>
                }

                <TouchableOpacity>
                    <View style={styles.headerPart}>
                        <Text style={{fontSize: 18,color:'#fff'}}>
                            {this.props.headerText}
                        </Text>
                    </View>
                </TouchableOpacity>
                {
                    this.props.headeruserText &&
                    <View style={styles.headerRight}>
                        <Text style={{fontSize: 18,color:'#fff',textAlign:'right',marginRight:10}}>
                            欢迎{this.props.headeruserText}
                        </Text>
                    </View>
                }

                {
                    this.props.del &&
                    <TouchableOpacity onPress={this.handlerdelBtnClick.bind(this) }
                                      style={[styles.headerRight,{alignItems:'flex-end',marginRight:20}]}>
                        <Image source={require('../../assets/del.png') }
                               style={{height: 18, width: 18}}/>
                    </TouchableOpacity>
                }
                {
                    !this.props.headeruserText && !this.props.del &&
                    <TouchableOpacity onPress={this.handlerdelBtnClick.bind(this) }
                                      style={[styles.headerRight]}>

                    </TouchableOpacity>
                }

            </View>
        );
    }

    handlerdelBtnClick(){
        this.props.call && this.props.call()
    }

    handlerBackBtnClick() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }
    handlersetBtnClick() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ChangInfo',
                component: ChangInfo,
                display: false
            })
        }
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40 + 20,
        marginTop: -20,
        backgroundColor: '#1993fb',
        borderBottomWidth: 1,
        borderColor: '#dddddd',
    },
    headerBackPart: {
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 15,
        flex:1
    },
    headerPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20
    },
    headerRight: {
        paddingTop: 20,
        flex:1
        // paddingRight: 15,
    }
});
