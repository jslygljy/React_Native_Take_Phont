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
    ListView,
    Easing,
    TextInput,
    ScrollView,
    AsyncStorage
} from 'react-native';

import BackableHeader from '../../ui/Header'
import TabHeader from '../../ui/TabHeader'
import ImagePicker from 'react-native-image-picker';
import ZoomImage from '../../ui/ZoomUi';
import ConfirmDlg from '../../ui/ConfirmDlg';
import * as YHToast from "../../ui/toast";

import Home from '../Home';
import List from '../List';

const {
    width,
    height
}  = Dimensions.get('window');
import Http from "../../ui/Http";


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex:0,
            showdetail:1,
            showconfig:false,
            avatarSource: null,
            codeMark:'',
            total:'',
            invoiceNumber:'',
            issueDate:'',
            correctCode:'',
            data:{
                payer:{

                },
                seller:{},
                sales:{}
            },
            json : [{
                name:'12312321',
                model:'123312',
                unit:'盒',
                num:'123',
                price:'123',
                money:'123'
            },{
                name:'12312321',
                model:'123312',
                unit:'盒',
                num:'123',
                price:'123',
                money:'123'
            }]
        };

    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    handlerBackBtnClick(){

    }


    async componentDidMount() {
        let params = {
            number:this.props.number,
            invoice:this.props.id
        }
        Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceInfo',
            params:params
        }).then(data => {
           console.log(data)
            this.setState({
                data:data
            })
        })
    }


    _switchPickType(activeIndex) {
        this.setState({
            activeIndex: activeIndex,
        });
    }

    setTabItems = () => {
        let item = [`发票信息`, `销货明细`]
        return item
    }

    async comfim (){
        let token = await AsyncStorage.getItem('token');
        if(this.state.data.numberMark == '' && this.state.data.codeMark == '' && this.state.data.issueDateMark == '' && this.state.data.totalMark == '' && this.state.data.correctMark == ''){
            YHToast.show('不能四要素都为空');
            return
        }
        let params = {
            invoiceCode:this.state.codeMark,
            invoiceNumber:this.state.invoiceNumber,
            number:this.props.number,
            issueDate:this.state.data.issueDate,
            invoicePrice:this.state.total,
            correctCode:this.state.correctCode,
            customer:token,
            invoice:this.props.id
        }
        console.log(params)
        Http.post({
            url: 'http://139.224.2.4:9000/api/upInvoice',
            params:params
        }).then(data => {

            if(data){
                YHToast.show('更新成功');
            }else{
                YHToast.show('更新失败');
            }


        })

    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

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
                let params = {
                    file:response.uri,
                    number:this.props.number,
                    invoice:this.props.id
                }
                console.log(params)
                Http.post({
                    url: 'http://139.224.2.4:9000/api/uploadSales',
                    params:params
                }).then(data => {
                    if(data){
                        YHToast.show('上传成功');
                    }else{
                        YHToast.show('上传失败');
                    }
                    // const {navigator} = this.props;
                    // navigator.push({
                    //     name: 'Home',
                    //     component: Home
                    // })


                })
                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    handlerdelBtnClick(){
        this.setState({
            showconfig: true
        });
    }
    renderOrderRow(row,rowjson,rowID){
        return (
            <View style={styles.listviewstyle3}>
                <Text style={[styles.titlefont]}>{Number(rowID)+1}</Text>
                <View style={styles.onerow}>
                    <Text style={[styles.loginImg]}>
                        货物名称：{row.name}</Text>
                </View>
                <View style={styles.onerow}>
                    <Text style={[styles.loginImg]}>
                        规格型号：{row.type}</Text>
                </View>
                <View style={styles.tworow}>
                    <Text
                        style={[styles.twolist,{marginLeft:20}]}>
                        单位：{row.unit}</Text>
                    <Text
                        style={[styles.twolist]}>
                        数量：{row.total}</Text>
                </View>
                <View style={styles.tworow}>
                    <Text
                        style={[styles.twolist,{marginLeft:20}]}>
                        单价：{row.price}</Text>
                    <Text
                        style={[styles.twolist]}>
                        金额：{row.totalPrice}</Text>
                </View>

            </View>

        )
    }
    submitNoStockInfo() {
        console.log('确定');
        let params = {
            number:[this.props.number],
            invoice:[this.props.id]
        }
        Http.post({
            url: 'http://139.224.2.4:9000/api/delInvoice',
            params:params
        }).then(data => {
            console.log(data)
            if(data){
                YHToast.show('删除成功');
                this.props.navigator.pop()
            }else{
                YHToast.show('删除失败');
            }
            this.setState({
                showconfig: false
            });
            // const {navigator} = this.props;
            // navigator.push({
            //     name: 'Home',
            //     component: Home
            // })
        })

    }
    closeNoStockConfirmDlg(){
        this.setState({
            showconfig: false
        });
    }
    switchzuofei(name) {

        if (name == 'N') {
            return '不作废'
        }
        if (name == 'Y') {
            return '作废'
        }
        else{
            return ''
        }
    }
    render() {
        const dataSource = this.ds.cloneWithRows(this.state.data.sales);
        return (
            <View style={styles.container}>
                <BackableHeader headerText='发票详细' del={true}
                                call={this.handlerdelBtnClick.bind(this)}
                                navigator={this.props.navigator}/>
                <View style={styles.imgItem}>
                    {
                        !this.state.data.fp_path &&
                        <ZoomImage
                            source={{uri: this.state.data.fp_path}}
                            imgStyle={{width: width-40, height:130,marginBottom:20,marginLeft:20}}
                            style={styles.img}
                            easingFunc={Easing.bounce}
                        />
                    }
                    {
                        this.state.data.fp_path &&
                        <Text style={styles.ercode}>二维码图片</Text>
                    }

                    <TabHeader
                        items={this.setTabItems()}
                        onTabChanged={this._switchPickType.bind(this)}
                        tabStyle={{borderBottomWidth: 0}}>
                    </TabHeader>

                    {
                        this.state.activeIndex == 0 &&
                        <View style={styles.liststyle}>
                            <View style={styles.loginRow}>
                                <Text style={[styles.loginImg]}>发票代码：</Text>
                                {
                                    this.state.data.codeMark == 0 &&
                                    <Text style={[styles.loginRowInput2]}>
                                        {this.state.data.invoiceCode}
                                    </Text>
                                }
                                {
                                    this.state.data.codeMark == 1 &&
                                    <TextInput style={styles.loginRowInput}
                                           value={this.state.data.invoiceCode}
                                           onChangeText={(codeMark) => this.setState({codeMark}) }
                                           placeholder={`请输入发票代码`}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           autoCapitalize='none' autoFocus={false}
                                    />
                                }
                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    发票号码：</Text>
                                {
                                    this.state.data.numberMark == 0 &&
                                    <Text style={[styles.loginRowInput2]}>
                                        {this.state.data.invoiceNumber}
                                    </Text>
                                }
                                {
                                    this.state.data.numberMark == 1 &&
                                    <TextInput style={styles.loginRowInput}
                                           value={this.state.data.invoiceNumber}
                                           onChangeText={(invoiceNumber) => this.setState({invoiceNumber}) }
                                           placeholder={`请输入发票号码`}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           autoCapitalize='none' autoFocus={false}
                                    />
                                }
                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    开票日期：</Text>
                                {
                                    this.state.data.issueDateMark == 0 &&
                                    <Text style={[styles.loginRowInput2]}>
                                        {this.state.data.issueDate}
                                    </Text>
                                }
                                {
                                    this.state.data.issueDateMark == 1 &&

                                <TextInput style={styles.loginRowInput}
                                           value={this.state.data.issueDate}
                                           onChangeText={(issueDate) => this.setState({issueDate}) }
                                           placeholder={`请输入开票日期`}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           autoCapitalize='none' autoFocus={false}
                                />
                                }
                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    校验码：</Text>
                                {
                                    this.state.data.correctMark == 0 &&
                                    <Text style={[styles.loginRowInput2]}>
                                        {this.state.data.correctCode}
                                    </Text>
                                }
                                {
                                    this.state.data.correctMark == 1 &&
                                    <TextInput style={styles.loginRowInput}
                                           value={this.state.data.correctCode}
                                           onChangeText={(correctCode) => this.setState({correctCode}) }
                                           placeholder={`请输入校验码`}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           autoCapitalize='none' autoFocus={false}
                                    />
                                }
                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    税前金额：</Text>
                                {
                                    this.state.data.totalMark == 0 &&
                                    <Text style={[styles.loginRowInput2]}>
                                        {this.state.data.total.total}
                                    </Text>
                                }
                                {
                                    this.state.data.totalMark == 1 &&
                                    <TextInput style={styles.loginRowInput}
                                           value={this.state.data.total.total}
                                           onChangeText={(total) => this.setState({total}) }
                                           placeholder={`请输入税前金额`}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           autoCapitalize='none' autoFocus={false}
                                    />
                                }

                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    购买方名称：</Text>
                                <Text style={[styles.loginRowInput2]}>
                                    {this.state.data.payer.payerName || 0}
                                </Text>
                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    销售方名称：</Text>
                                <Text style={[styles.loginRowInput2]}>
                                    {this.state.data.seller.sellerName}
                                </Text>
                            </View>
                            <View style={styles.loginRow}>
                                <Text
                                    style={[styles.loginImg]}>
                                    是否作废：</Text>
                                <Text style={[styles.loginRowInput2]}>
                                    {this.switchzuofei(this.state.data.invalid)}</Text>
                            </View>
                        </View>
                    }
                    {
                        this.state.activeIndex == 1 && this.state.data.sales.length > 0 &&
                        <ScrollView>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <ListView
                                    dataSource={dataSource}
                                    style={styles.listviewstyle}
                                    renderRow={this.renderOrderRow.bind(this)}
                                />

                            </View>
                        </ScrollView>
                    }
                    {
                        this.state.activeIndex == 1 && this.state.data.sales.length == 0 &&
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <View style={{marginTop: 20}}>
                                    { this.state.avatarSource === null ?
                                        <Text>拍照上传</Text> :
                                        <Image style={{width:200,height:200}} source={this.state.avatarSource} />
                                    }
                                </View>
                            </TouchableOpacity>

                        </View>
                    }
                    {
                        this.state.activeIndex == 0 &&
                        (this.state.data.numberMark == 1 || this.state.data.codeMark == 1|| this.state.data.issueDateMark == 1|| this.state.data.totalMark == 1|| this.state.data.correctMark == 1) &&
                        <TouchableOpacity style={{
                            width: 200,
                            height: 30,
                            borderColor: "#24A8E8",
                            backgroundColor: '#24A8E8',
                            borderRadius: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft:60,
                            marginTop:10
                        }} onPress={this.comfim.bind(this)}>
                            <Text style={{color: '#fff', fontSize: 18}}>更新</Text>
                        </TouchableOpacity>
                    }
                    {
                        this.state.activeIndex == 1 &&
                        <Text style={styles.searchcss}>查询结果:{this.state.data.sales.length}条</Text>
                    }
                    {this.state.showconfig ? <ConfirmDlg
                        btnConfirm={{txt: '确定', callback: this.submitNoStockInfo.bind(this)}}
                        btnCancel={{txt: '取消', callback: this.closeNoStockConfirmDlg.bind(this)}}
                        content={'确定删除？'}/> : null}
                </View>
            </View>

        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor:'rgb(213,226, 254)'
    },
    ercode:{
       height:60,
        lineHeight:40,
        textAlign:'center',
    },
    titlefont:{
        fontWeight:'bold',
        marginLeft:20
    },
    tworow:{
        flex:1,
        flexDirection:'row'
    },
    onerow:{
        flex:1
    },
    twolist:{
        color:'#a6a6ad',
        fontSize:14,
        lineHeight:30,
        flex:1,
        height:35,
        borderColor: '#d9d9d9',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },
    searchcss:{
        textAlign:'right',
        marginRight:20,
        marginTop:20
    },
    listviewstyle3:{
        backgroundColor:'#fff',
        margin:10,
    },
    liststyle:{
        flexDirection: 'column'
    },
    listviewstyle:{
        flex:1
    },
    imgItem: {
        flex:1,
        margin:5
    },
    overlay2: {
        position: 'absolute',
        top: 8,
        left: 8,
        flex:1,
        alignItems: 'center',
    },
    loginRow:{
        borderColor: '#d9d9d9',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        height:40,
        flexDirection: 'row',
        backgroundColor:'#fff'
    },
    loginRowInput2:{
        fontSize: 14,
        textAlign: 'center',
        height:40,
        lineHeight:30,
        flex: 1,
    },
    loginImg: {
        color:'#a6a6ad',
        fontSize:14,
        lineHeight:30,
        flex:0.6,
        marginLeft:20,
        height:35,
    },
    loginRowInput: {
        height: 40,
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        left: width/2 - 40,
        alignItems: 'center',
        position:'absolute'
    },

    bottomOverlay: {
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    backgroundImage:{
        width:width-16,height:height-16,
        resizeMode:'contain'

    },
    item:{
        margin:15,
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'#ddd',
        textAlign:'center'
    },
    image:{
        height:198,
        width:300,
        alignSelf:'center',
    }
});