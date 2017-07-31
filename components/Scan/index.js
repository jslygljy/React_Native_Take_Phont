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
import ImagePicker from 'react-native-image-picker';
import ConfirmDlg from '../../ui/ConfirmDlg';

const {
    width,
    height
}  = Dimensions.get('window');
import * as YHToast from "../../ui/toast";
import Home from '../Home';
import Photo from '../Photo';
import Http from "../../ui/Http";



export default class scan extends Component {
    constructor(props) {
        super(props);
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
            showtakephone:false,
            avatarSource: null,
            showconfig:false,
            name:''
        };

        this.takePicture = this.takePicture.bind(this);
        // this.startRecording = this.startRecording.bind(this);
        // this.stopRecording = this.stopRecording.bind(this);
        // this.switchType = this.switchType.bind(this);
        // this.switchFlash = this.switchFlash.bind(this);
    }

    takePicture() {
        if (this.camera) {

            this.camera.capture()
                .then((data) => console.log(data))
                .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        clearInterval(this.timer);
        this.timer = setTimeout(()=>{
            this.setState({
                showtakephone:true
            })
        },1000 * 5);
    }
    async _onBarCodeRead(e) {
        console.log(e.data)
        this.setState({
            name: e.data,
            showconfig:true
        });
        if(typeof e.data == 'string' && e.data.split(',').length>4 && e.data.split(',')[2].length==10){
            this.setState({
                showtakephone:false
            })
            let token = await AsyncStorage.getItem('token');
            let params = {
                customer:token,
                invoiceCode:e.data.split(',')[2],
                invoiceNumber:e.data.split(',')[3],
                issueDate:e.data.split(',')[5],
                invoicePrice:e.data.split(',')[4],
                correctCode:e.data.split(',')[6]
            }
            console.log(params)
            Http.post({
                url: 'http://139.224.2.4:9000/api/uploadSales',
                params:params
            }).then(data => {
                console.log(data)
                if(data){
                    YHToast.show('上传成功');
                }
                if(data===false){
                    YHToast.show('发票已存在');
                }else{
                    YHToast.show('上传失败');
                }
            })

            clearInterval(this.timer);
            this.timer = setTimeout(()=>{
                this.setState({
                    showtakephone:true
                })
            },1000 * 5);
        }else{
            YHToast.show('这不是发票的二维码')
        }
    }
    gophoto(){
        const {navigator} = this.props;
        navigator.push({
            name: 'Photo',
            component: Photo
        })
    }

    selectPhotoTapped() {
        var options = {
            //底部弹出框选项
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:null,
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                YHToast.show('已上传')

                this.setState({
                    avatarSource: source
                });
                const {navigator} = this.props;
                navigator.push({
                    name: 'Home',
                    component: Home,
                    display: false
                })
            }
        });
    }

    submitNoStockInfo() {
        const {navigator} = this.props;
        navigator.push({
            name: 'Home',
            component: Home
        })

    }

    closeNoStockConfirmDlg(){
        this.setState({
            showconfig: false
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <BackableHeader headerText='二维码扫描' navigator={this.props.navigator}/>
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
                    onBarCodeRead={ this._onBarCodeRead.bind(this)}
                />
                {
                    this.state.showtakephone &&
                    <Text style={styles.capturefont}>
                        二维码无法识别，请拍摄发票
                    </Text>
                }


                <View style={[styles.overlay2]}>
                    <Image style={styles.backgroundImage}
                           source={require('../../assets/bg3.png')}
                    />
                </View>

                <View style={styles.footer}>
                    {
                        <View style={[styles.bottomOverlay, styles.topOverlay]}>
                            <View style={styles.captureButton}>
                                <Text>
                                    扫描
                                </Text>
                                {/*<Image*/}
                                    {/*source={require('../../assets/ic_photo_camera_36pt.png')}*/}
                                {/*/>*/}
                            </View>
                        </View>
                    }

                        <View style={[styles.bottomOverlay, styles.topOverlay]}>
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={this.gophoto.bind(this)}
                            >
                                <Image
                                    source={require('../../assets/ic_photo_camera_36pt.png')}
                                />

                            </TouchableOpacity>
                        </View>

                </View>

                {this.state.showconfig ? <ConfirmDlg
                    btnCancel={{txt: '下一个', callback: this.closeNoStockConfirmDlg.bind(this)}}
                    btnConfirm={{txt: '完成', callback: this.submitNoStockInfo.bind(this)}}
                    content={'   扫描结果为   '+this.state.name    }/> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    footer:{
        backgroundColor:'#0290fe',
        height:80,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    overlay2: {
        position: 'absolute',
        top: 40,
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
        justifyContent: 'center',
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
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    backgroundImage:{
        width:width,height:height-80,
        resizeMode:'cover'

    }
});