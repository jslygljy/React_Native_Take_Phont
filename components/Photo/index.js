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
    AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import BackableHeader from '../../ui/Header'

const {
    width,
    height
}  = Dimensions.get('window');
import * as YHToast from "../../ui/toast";
import Home from '../Home';
import Scan from '../Scan';
import Http from "../../ui/Http";

export default class scan extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
                onBarcodeRead: Camera.constants.onBarcodeRead,
            },
            codeFlag: false,
            scroll: {top: 220},
            showtakephone:false
        };

        this.takePicture = this.takePicture.bind(this);
        // this.startRecording = this.startRecording.bind(this);
        // this.stopRecording = this.stopRecording.bind(this);
        // this.switchType = this.switchType.bind(this);
        // this.switchFlash = this.switchFlash.bind(this);
    }

    async takePicture() {
        let token = await AsyncStorage.getItem('token');
        if (this.camera) {
            this.camera.capture()
                .then((data) => {
                    let params = {
                        customer:token,
                        file:data.path
                    }
                    console.log(data.path)
                    Http.post({
                        url: 'http://139.224.2.4:9000/api/upload',
                        params:params
                    }).then(data => {
                        console.log(data)
                        if (data){
                            YHToast.show('上传成功');
                            const {navigator} = this.props;
                            navigator.push({
                                name: 'Home',
                                component: Home,
                                display: false
                            })
                        }else{
                            YHToast.show(data.message);
                        }
                    })

                })
                .catch(err => console.error(err));
        }
    }
    goscan(){
        this.props.navigator.pop()
    }
    gohome(){
        const {navigator} = this.props;
        navigator.push({
            name: 'Home',
            component: Home,
            display: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                    orientation={this.state.camera.orientation}
                />


                <View style={[styles.overlay2]}>
                    <Image style={styles.backgroundImage}
                           source={require('../../assets/bg1.png')}
                    />
                </View>

                <View style={styles.footerbutton}>
                    <View style={[styles.bottomOverlay]}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.goscan.bind(this)}
                        >
                            <Image
                                source={require('../../assets/back.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.bottomOverlay]}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Image
                                source={require('../../assets/ic_photo_camera_36pt.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.bottomOverlay]}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.gohome.bind(this)}
                        >
                            <Image
                                source={require('../../assets/home1.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    footerbutton:{
        flexDirection:'row',
        height:80,
        width:width,
        justifyContent:'space-around',
        backgroundColor:'#0290fe',
    },
    overlay2: {
        position: 'absolute',
        top: -20,
        left: 0,
        flex:1,
        alignItems: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },


    bottomOverlay: {
        bottom:10,
        flex:1,
        justifyContent:'space-around',
        alignItems: 'center',
    },
    capturefont:{
        width:width,
        position:'absolute',
        bottom:90,
        color:'#fff',
        right:30,
        width:120,
        zIndex:2
    },
    captureButton: {
        width:60,
        height:60,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:20
    },
    backgroundImage:{
        width:width,
        height:height,
        resizeMode:'contain'

    }
});