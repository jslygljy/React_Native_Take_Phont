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
    Text,
    TextInput,
    AsyncStorage
} from 'react-native';
import Http from "../../ui/Http";
import Home from '../Home';

const {
    width,
    height
}  = Dimensions.get('window');
import * as YHToast from "../../ui/toast";
import Button from  "../../ui/Button"
import BackableHeader from '../../ui/Header'

export default class ChangInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            comfimpassword: "",
            companyname:'',
            emailname:'',
            phone:'',
            partnerSwitchIsOn: false
        }
    }

    async comfim(){
        if(this.state.password==""){
            YHToast.show('请输入新密码');
            return
        }
        if(this.state.password !== this.state.comfimpassword){
            YHToast.show('确认密码两次输入一致');
            return
        }
        let token = await AsyncStorage.getItem('token');
        let username = await AsyncStorage.getItem('username');
        let params = {
            customer:token,
            name:this.state.username,
            phone:this.state.phone,
            email:this.state.emailname,
            password:this.state.comfimpassword,
        }
        console.log(params)
        Http.post({
            url: 'http://139.224.2.4:9000/api/upCustomer',
            params:params
        }).then(data => {
            console.log(data)
            if (data.success){
                YHToast.show('更新成功');
                const {navigator} = this.props;
                navigator.push({
                    name: 'Home',
                    component: Home
                })
            }else{
                YHToast.show(data.message);
            }
        })
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token');
        let username = await AsyncStorage.getItem('username');
        let params = {
            customer:token,
        }
        Http.get({
            url: 'http://139.224.2.4:9000/api/getCustomer',
            params:params
        }).then(data => {
            console.log(data)
            if (data.success){

                this.setState({
                    companyname:data.data.name,
                    username:data.data.username,
                    emailname:data.data.email,
                    phone:data.data.phone,

                });
            }else{
                YHToast.show(data.message);
            }
        })
    }
    render() {
        const refundStyle = {
            width: 64,
            height: 26,
            borderColor: "#24A8E8",
            backgroundColor: '#fff',
            borderRadius: 4,
            borderWidth: 1
        };
        return (
            <View style={styles.container}>
                <BackableHeader headerText='用户信息' navigator={this.props.navigator}/>

                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        公司名称：</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.companyname }
                               onChangeText={(companyname) => this.setState({companyname}) }
                               placeholder={`请输入公司`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        用户名：</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.username }
                               onChangeText={(username) => this.setState({username}) }
                               placeholder={`请输入用户名`}
                               editable={false}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        邮箱：</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.emailname }
                               onChangeText={(emailname) => this.setState({emailname}) }
                               placeholder={`请输入邮箱`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        联系电话：</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.phone }
                               onChangeText={(phone) => this.setState({phone}) }
                               placeholder={`请输入联系电话`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        新密码：</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.password }
                               secureTextEntry={true}
                               onChangeText={(password) => this.setState({password}) }
                               placeholder={`请输入密码`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={styles.loginRow}>
                    <Text
                        style={[styles.loginImg]}>
                        确认密码：</Text>
                    <TextInput style={styles.loginRowInput} value={this.state.comfimpassword }
                               secureTextEntry={true}
                               onChangeText={(comfimpassword) => this.setState({comfimpassword}) }
                               placeholder={`请输入确认密码`}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               autoCapitalize='none' autoFocus={false}/>
                </View>
                <View style={{alignItems:'center',
                    justifyContent: 'center',}}>


                <TouchableOpacity style={{
                    width: 200,
                    height: 40,
                    borderColor: "#24A8E8",
                    backgroundColor: '#24A8E8',
                    borderRadius: 4,
                    alignItems:'center',
                    justifyContent: 'center',
                    marginTop:20
                }} onPress={this.comfim.bind(this)}>
                    <Text style={{color: '#fff', fontSize: 18}}>修改密码</Text>
                </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#f5f5f5',
    },
    loginLogo: {
        marginTop: 40,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginImg: {
        flex:0.5
    },
    loginLogoImg: {
        width: 98,
        height: 70.66
    },
    loginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#A0A0A0',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
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
        flex: 1,
        textAlign: 'center',
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
        backgroundColor: '#bba16e',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonView:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height:40
    },
    last:{

    },
    lastfont:{
        fontSize:16,
        color:'#000',
        textAlign:'center'
    }
});