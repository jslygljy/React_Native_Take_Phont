/**
 * Created by yh-ued on 2017/7/12.
 */
import React, { Component } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
    View,
    TextInput,
    Text,
    AsyncStorage
} from 'react-native';

import Home from '../Home';

const {
    width,
    height
}  = Dimensions.get('window');
import * as YHToast from "../../ui/toast";
import Http from "../../ui/Http";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "admin",
            password: "admin",
            partnerSwitchIsOn: false
        }
    }

    _checkLoginRules() {
        if (this.state.username.length === 0) {
            YHToast.show('请输入登录账号');
            return false;
        } else if (this.state.password.length === 0) {
            YHToast.show('密码为空,请重新输入');
            return false;
        }
        return true;
    }

    _handlerLoginButtonClick() {

        // var baseReq = {
        //     username: this.state.username,
        //     pwd: this.state.password,
        // };

        let params = {
            username:this.state.username,
            password:this.state.password
        }

        Http.post({
            url: 'http://139.224.2.4:9000/api/auth/login',
            params:params
        }).then(data => {

            if (!!data.id){
                this._saveLoginInfo(data);
                const {navigator} = this.props;
                console.log(navigator)
                navigator.push({
                    name: 'Home',
                    component: Home,
                    display: false
                })
            }else{
                YHToast.show(data.message);
            }

        })


        // var url = `${API_ENDPOINT}${LOGIN}?username=${this.state.username}&pwd=${this.state.password}${suffix(baseReq)}`;
        // fetch(url)
        //     .then(response => {
        //
        //     })
        //     .catch((error) => {
        //         YHToast.show(error.message);
        //     });
    }

    async _saveLoginInfo(json) {
        let token = json.id;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('username', json.username);
    }
    render() {

        return (
        <View style={styles.container}>
            <Text style={styles.test}>
                    测试版
            </Text>
            <View style={{flex:1}}>
                <View style={styles.loginLogo}>
                    {/*<Image style={styles.icon} source={require('../../assets/logo.png')}/>*/}
                    <Text style={styles.icon}>FACTURA</Text>
                </View>
                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        用户名</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.username }
                               onChangeText={(username) => this.setState({username}) }
                               placeholder={`请输入用户名`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={[styles.loginRow,{marginTop:30}]}>
                    <Text
                           style={[styles.loginImg]}>
                        密码</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.password }
                               secureTextEntry={true}
                               onChangeText={(password) => this.setState({password}) }
                               placeholder={`请输入密码`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonArea} onPress={this._handlerLoginButtonClick.bind(this) }>
                    <Text style={styles.buttonAreaText}>登录</Text>
                </TouchableOpacity>

                </View>
            </View>
            <View style={styles.last}>
                <Text style={styles.lastfont}>上海阙天商务信息咨询有限公司</Text>
            </View>
        </View>


        )
    }
}

const styles = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    test:{
        position:'absolute',
        right:20,
        top:10,
        fontSize:20
    },
    icon:{
        fontSize:32,
        color:'#fff'
    },
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#2686e4'
    },
    loginLogo: {
        marginTop: 100,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginImg: {
        color:'#fff',
        fontSize:20,
    },
    loginLogoImg: {
        width: 98,
        height: 70.66
    },
    loginRow: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 5,
        marginRight: 20,
        marginLeft: 20,
    },
    loginRowText: {
        flex: .2,
        textAlign: 'center'
    },
    loginRowInput: {
        height: 40,
        backgroundColor: '#b2d0f0',
        width:200,
        fontSize: 14,
        marginTop:10,
        textAlign: 'center',
        alignSelf:'center',
        borderColor: '#d9d9d9',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',

    },
    buttonAreaText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonArea: {
        backgroundColor: '#6ea3dd',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#2c7cd0',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        width:200,
        borderRadius:5
    },
    buttonView:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height:40
    },
    last:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:0.1
    },
    lastfont:{
        fontSize:16,
        color:'#fff',
        flex:1,
        textAlign:'center'
    }
});