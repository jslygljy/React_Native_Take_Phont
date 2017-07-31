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
    ListView,
    AsyncStorage
} from 'react-native';


import PieChart from 'react-native-pie-chart';
import BackableHeader from '../../ui/Header'
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from '../../ui/CheckBox'
import ListView2 from '../../ui/ListView'
import ConfirmDlg from '../../ui/ConfirmDlg';

import * as YHToast from "../../ui/toast";
import Detail from '../Detail';

const {
    width,
    height
}  = Dimensions.get('window');
import Http from "../../ui/Http";

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createdata:'',
            billnum:'',
            showconfig:false,
            footerStatus:'loading',
            pageIndex:1,
            pagesize:1,
            json:[],
            liststate:'',
            listtime:''
        };
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


    closeNoStockConfirmDlg(){
        this.setState({
            showconfig: false
        });
    }

    handlerBackBtnClick(id,number){
        const {navigator} = this.props;
        navigator.push({
            name: 'Detail',
            component: Detail,
            params:{
                id:id,
                number:number
            }
        })
    }

    onClick(rowID){
        this.state.json[rowID].isChecked =  !this.state.json[rowID].isChecked
    }
    async fetchData(){
        let token = await AsyncStorage.getItem('token');
        let params = {
            customer:token,
            page:this.state.pageIndex,
            invoiceNumber:this.state.billnum,
            status:this.state.liststate,
            day:this.state.listtime
        }
        await Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceList',
            params:params
        }).then(data => {
            if (data.invoiceList.length>0){
                data.invoiceList.forEach((date)=>{
                    date.isChecked = false
                });
            }
            this.setState({
                footerStatus:'loaded'
            })
            let list = this.state.json.concat(data.invoiceList)
            this.setState({
                json:list
            })

            return data


        })
    }
    async componentDidMount() {
        this.setState({
            liststate:this.props.name || '',
            createdata:''
        });
        let token = await AsyncStorage.getItem('token');
        let params = {
            customer:token,
            page:this.state.pageIndex,
            invoiceNumber:this.state.billnum,
            status:this.state.liststate,
            day:this.state.listtime
        }
        console.log(params)
        Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceList',
            params:params
        }).then(data => {
            console.log(data)
            if (data.invoiceList.length>0){
                data.invoiceList.forEach((date)=>{
                    date.isChecked = false
                });
            }
            this.setState({
                all:data.sum,
                json:data.invoiceList,
                pagesize:Math.ceil(data.sum / 10)
            });

        })
    }
    handlerdelBtnClick(){
        this.setState({
            showconfig: true
        });
    }
    renderOrderRow(row,rowjson,rowID){
            console.log(this.state.createdata,row.date)
        if (row.date && row.date != this.state.createdata){

            this.state.createdata = row.date
            return (
                <View>
                    <Text style={styles.listviewstyle5}>
                        ----------{row.date}----------
                    </Text>
                    <View style={styles.listviewstyle3}>

                <CheckBox
                    style={{flex: 0.4, paddingTop: 10,marginLeft:5}}
                    onClick={()=>this.onClick(rowID)}
                    isChecked={row.isChecked}
                />

                <TouchableOpacity style={{flex: 0.5,marginTop:9}}  onPress={this.handlerBackBtnClick.bind(this,row.invoice.id,row.number)}>
                    <Text style={{textAlign:'center'}}>{row.number}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1,marginTop:9}} onPress={this.handlerBackBtnClick.bind(this,row.invoice.id,row.number)}>
                    <Text style={{textAlign:'center'}}>{row.invoiceNumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1,marginTop:9}} onPress={this.handlerBackBtnClick.bind(this,row.invoice.id,row.number)}>
                    <Text style={[{textAlign:'center',color:this.swich(row.invoice.status)}]}>
                        {this.swichfont(row.invoice.status)}</Text>
                </TouchableOpacity>
            </View>
                </View>
            )
        }else{
            return (
            <View style={styles.listviewstyle3}>
                <CheckBox
                     style={{flex: 0.4, paddingTop: 10,marginLeft:5}}
                     onClick={()=>this.onClick(rowID)}
                     isChecked={row.isChecked}
                />

                <TouchableOpacity style={{flex: 0.5,marginTop:9}}  onPress={this.handlerBackBtnClick.bind(this,row.invoice.id,row.number)}>
                    <Text style={{textAlign:'center'}}>{row.number}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1,marginTop:9}} onPress={this.handlerBackBtnClick.bind(this,row.invoice.id,row.number)}>
                    <Text style={{textAlign:'center'}}>{row.invoiceNumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1,marginTop:9}} onPress={this.handlerBackBtnClick.bind(this,row.invoice.id,row.number)}>
                    <Text style={[{textAlign:'center',color:this.swich(row.invoice.status)}]}>
                        {this.swichfont(row.invoice.status)}</Text>
                </TouchableOpacity>
            </View>
            )
        }
    }
    swichfont(name){
        if(name =='success'){
            return '成功'
        }
        if(name =='failed'){
            return '查询无结果'
        }
        if(name =='noInvoice'){
            return '无法识别'
        }
        if(name =='needChange'){
            return '信息需更新'
        }
        if(name =='noSales'){
            return '销货明细需补充'
        }
        if(name =='waiting'){
            return '查询中'
        }
    }
    swich(name){
        if(name =='success'){
            return '#1aaf54'
        }
        if(name =='noInvoice' || name =='failed'){
            return '#be0712'
        }
        if(name =='needChange' || name =='noSales'){
            return '#fdc865'
        }
        if(name =='waiting'){
            return '#a6a6a6'
        }
    }
    async comfim(){
        this.state.pageIndex =1;

        let token = await AsyncStorage.getItem('token');
        let params = {
            customer:token,
            page:this.state.pageIndex,
            invoiceNumber:this.state.billnum,
            status:this.state.liststate,
            day:this.state.listtime
        }
        Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceList',
            params:params
        }).then(data => {
            if (data.invoiceList.length>0){
                data.invoiceList.forEach((date)=>{
                    date.isChecked = false
                });
            }

            this.setState({
                all:data.sum,
                json:data.invoiceList,
                pagesize:Math.ceil(data.sum / 10)
            });

        })
    }

    submitNoStockInfo() {
        console.log('确定');
        let json = 0
        this.state.json.forEach((date,index)=>{
            if (date.isChecked){
                json++
            }
        })
        if (json==0){
            YHToast.show('请选择超过一个');
        }else{
            this.del()
        }

    }
    del(){
        let invoicemath = [];
        let numbermath = [];
        this.state.json.forEach((date,index)=>{
            if (date.isChecked){
                invoicemath.push(this.state.json[index].invoice.id)
                numbermath.push(this.state.json[index].number)
            }
        });
        let params = {
            number:numbermath,
            invoice:invoicemath
        }
        Http.post({
            url: 'http://139.224.2.4:9000/api/delInvoice',
            params:params
        }).then(data => {
            console.log(data)
            if(data){
                YHToast.show('删除成功');
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
    _time(index,val){
        console.log(index,val)
        let name = ''
        if (val == '当天上传'){
            name = 1
        }
        if (val == '7天上传'){
            name = 7
        }
        if (val == '30天上传'){
            name = 30
        }
        if (val == '当月开票'){
            name = 30
        }
        if (val == '上月开票'){
            name = 45
        }
        if (val == '全部'){
            name = ''
        }
        this.setState({
            listtime:name
        })

    }
    _type(index,val){
        let name = ''
        if (val == '未查到'){
            name = 'failed'
        }
        if (val == '查询中'){
            name = 'waiting'
        }
        if (val == '销货明细需补充'){
            name = 'noSales'
        }
        if (val == '信息需更新'){
            name = 'needChange'
        }
        if (val == '无法识别'){
            name = 'noInvoice'
        }
        if (val == '成功'){
            name = 'success'
        }
        if (val == '全部'){
            name = ''
        }
        this.setState({
            liststate:name
        })


}

    async fetchDataLoadmore () {
        if (this.state.pageIndex  < this.state.pagesize) {
            this.setState({
                footerStatus:'loading'
            })
            this.state.pageIndex++;
            await this.fetchData()


        }else{
            this.setState({
                footerStatus:'end'
            })

        }
    }

    render() {
        const chart_wh = 250
        const series = [4, 1]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

        const dataSource = this.ds.cloneWithRows(this.state.json);
        let typelist = ['查询中','未查到','补销货明细','四要素需更新','无法识别','成功','全部']
        return (
            <View style={styles.container}>
                <BackableHeader headerText='发票列表' navigator={this.props.navigator}/>
                <View style={styles.listviewstyle2}>
                    <View style={styles.loginRow}>
                        <TouchableOpacity style={{
                            width: 200,
                            height: 40,
                            borderColor: "#24A8E8",
                            backgroundColor: '#24A8E8',
                            borderRadius: 4,
                            alignItems:'center',
                            justifyContent: 'center',
                            flex:1,
                            marginLeft:20
                        }} onPress={this.comfim.bind(this)}>
                            <Text style={{color: '#fff', fontSize: 18}}>查询</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:0.2,marginLeft:40}} onPress={this.handlerdelBtnClick.bind(this)}>
                            <Image style={styles.icon} source={require('../../assets/del.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginRow}>
                        <Text style={[styles.loginImg]}>输入号码名称：</Text>
                        <TextInput style={styles.loginRowInput} value={this.state.billnum }
                                   onChangeText={(billnum) => this.setState({billnum}) }
                                   placeholder={`请输入发票号码`}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   autoCapitalize='none' autoFocus={false}/>
                    </View>

                    <View style={styles.loginRow}>
                        <Text style={[styles.loginImg]}>选择查询区间：</Text>
                        <View style={styles.loginRowInput2}>
                            <ModalDropdown
                                style={{flex:1,marginTop:15}}
                                options={['全部','当天上传','7天上传','30天上传','当月开票','上月开票']}
                                defaultValue="全部"
                                dropdownStyle={{width:150,marginLeft:10}}
                                onSelect={(idx, value) => this._time(idx, value)}
                            />
                        </View>
                    </View>

                    <View style={styles.loginRow}>
                        <Text
                            style={[styles.loginImg]}>
                            选择发票状态：</Text>
                        <View style={styles.loginRowInput2}>
                            <ModalDropdown
                                options={['查询中','未查到','销货明细需补充','信息需更新','无法识别','成功','全部']}
                                style={{flex:1,marginTop:15}}
                                dropdownStyle={{width:150,marginLeft:10}}
                                defaultIndex={this.props.type || 0}
                                defaultValue={typelist[this.props.type] || '全部'}
                                onSelect={(idx, value) => this._type(idx, value)}
                            />
                        </View>

                    </View>
                </View>

                <View style={styles.listviewstyle4}>
                    <View style={styles.listitle}>
                        <Text style={[styles.listfont,{marginLeft:20}]}>序号</Text>
                        <Text style={styles.listfont}>发票号</Text>
                        <Text style={styles.listfont}>状态</Text>
                    </View>
                    <ListView2
                        scrollEventThrottle={200}
                        dataSource={dataSource}
                        renderRow={this.renderOrderRow.bind(this)}
                        navigator={this.props.navigator}
                        onEndReached={this.fetchDataLoadmore.bind(this)}
                        onEndReachedThreshold={20}
                        enableEmptySections={true}
                        style={styles.listviewstyle}
                        footerStatus={this.state.footerStatus}
                    />

                </View>
                <Text style={styles.searchcss}>查询结果:{this.state.json.length}条</Text>
                {this.state.showconfig ? <ConfirmDlg
                    btnConfirm={{txt: '确定', callback: this.submitNoStockInfo.bind(this)}}
                    btnCancel={{txt: '取消', callback: this.closeNoStockConfirmDlg.bind(this)}}
                    content={'确定删除？'}/> : null}
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
    searchcss:{
        flex:0.1,
        textAlign:'right',
        marginRight:20
    },
    loginRow:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:5,
    },
    listitle:{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop:20
    },
    listfont:{
        color:'#1993fb'
    },
    loginImg: {
        flex:0.5,
        color:'#1993fb',
        marginLeft:20
    },
    loginRowInput2:{
        height: 40,
        flex: 1,
        alignItems: 'center',
        borderColor: '#d9d9d9',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },
    listviewstyle:{
        flex:1
    },
    listviewstyle2:{
        flex:1,
        backgroundColor:'#fff',
        margin:10,
    },
    listviewstyle3:{
        flexDirection: 'row',
        justifyContent:'center',
        height:40,
    },
    listviewstyle5:{
        lineHeight:35,
        textAlign:'center',
        justifyContent:'center',
        flex: 1,
    },
    listviewstyle4:{
        flex:1.5,
        backgroundColor:'#fff',
        margin:10,
    },
    loginRowInput: {
        height: 40,
        flex: 1,
        textAlign: 'center',
        borderColor: '#d9d9d9',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },


});