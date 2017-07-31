/**
 * Created by yh-ued on 2017/7/12.
 */
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
    View,
    Text,
    AsyncStorage
} from 'react-native';

import PieChart from 'react-native-pie-chart';
import BackableHeader from '../../ui/Header'
import Scan from '../Scan'
import List from '../List'
import Http from "../../ui/Http";


const {
    width,
    height
}  = Dimensions.get('window');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabindex:0,
            username:'ljy',
            all:0,
            suc:0,
            needChange:0,
            waiting:0,
            noSales:0,
            failed:0,
            noInvoice:0
        };
    }

    handlerBackBtnClick(num){
        let day = 0;
        if (num==0){
            day = 1
        }
        if (num==1){
            day = 7
        }
        if (num==2){
            day = 30
        }
        if (num==3){
            day = ''
        }

        let params = {
            customer:this.state.token,
            day:day
        }
        Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceCount',
            params:params
        }).then(data => {
            console.log(data)
            data.statusTotal.forEach((data2,index)=>{
                if (data2.status == 'success'){
                    this.setState({
                        suc:data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'waiting'){
                    this.setState({
                        waiting :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'noSales'){
                    this.setState({
                        noSales :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'failed'){
                    this.setState({
                        failed :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'noInvoice'){
                    this.setState({
                        noInvoice :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'needChange'){
                    this.setState({
                        needChange:data.statusTotal[index].total || 0
                    });
                }

            })

            this.setState({
                all:data.sum
            });

        })
        this.setState({
            tabindex:num
        });
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token');
        let username = await AsyncStorage.getItem('username');

        this.setState({
            username:username,
            token:token
        });

        let params = {
            customer:this.state.token,
            day:''
        }
        Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceCount',
            params:params
        }).then(data => {

            data.statusTotal.forEach((data2,index)=>{
                if (data2.status == 'success'){
                    this.setState({
                        suc:data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'waiting'){
                    this.setState({
                        waiting :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'noSales'){
                    this.setState({
                        noSales :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'failed'){
                    this.setState({
                        failed :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'noInvoice'){
                    this.setState({
                        noInvoice :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'needChange'){
                    this.setState({
                        needChange:data.statusTotal[index].total || 0
                    });
                }

            })



            this.setState({
                all:data.sum
            });

        })
    }

    handlerphoneBtnClick(){
        const {navigator} = this.props;
        navigator.push({
            name: 'Scan',
            component: Scan
        })
    }
    handlerlistClick(){
        const {navigator} = this.props;
        navigator.push({
            name: 'List',
            component: List,
            params:{
                user:0,
            }
        })
    }
    async refuesf(){
        let token = await AsyncStorage.getItem('token');
        let username = await AsyncStorage.getItem('username');
        this.setState({
            username:username,
            token:token
        });

        let params = {
            customer:this.state.token,
            day:''
        }
        Http.get({
            url: 'http://139.224.2.4:9000/api/invoiceCount',
            params:params
        }).then(data => {
            console.log(data)
            data.statusTotal.forEach((data2,index)=>{
                if (data2.status == 'success'){
                    this.setState({
                        suc:data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'waiting'){
                    this.setState({
                        waiting :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'noSales'){
                    this.setState({
                        noSales :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'failed'){
                    this.setState({
                        failed :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'noInvoice'){
                    this.setState({
                        noInvoice :data.statusTotal[index].total || 0
                    });
                }
                if (data2.status == 'needChange'){
                    this.setState({
                        needChange:data.statusTotal[index].total || 0
                    });
                }

            })

            this.setState({
                all:data.sum
            });

        })
    }
    tolist(type,name){
        const {navigator} = this.props;
        navigator.push({
            name: 'List',
            component: List,
            params:{
                type:type,
                name:name
            }
        })
    }
    render() {
        const chart_wh = width/2
        const series = [this.state.all || 1, this.state.suc||1]
        const sliceColor = ['#4674c1','#b5c8e6']



        return (
            <View style={[styles.bgimg,styles.container]}>
                <BackableHeader headerText='首页' navigator={this.props.navigator} set={true} headeruserText={this.state.username}/>
                <View style={styles.charsview}>
                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        style={{marginTop:20,marginLeft:20}}
                        coverRadius={0.7}
                        coverFill={'#FFF'}
                    />
                    <Text style={styles.percentage}>{this.state.suc+'/'+this.state.all}</Text>
                    <View style={styles.percentlist}>
                        <TouchableOpacity onPress={this.handlerBackBtnClick.bind(this,0) }
                                          style={[styles.listRowbg,this.state.tabindex==0?styles.active:'']}>
                            <Text style={styles.tabfont}>当天</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handlerBackBtnClick.bind(this,1) }
                                          style={[styles.listRowbg,this.state.tabindex==1?styles.active:'']}>
                            <Text style={styles.tabfont}>7天</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handlerBackBtnClick.bind(this,2) }
                                          style={[styles.listRowbg,this.state.tabindex==2?styles.active:'']}>
                            <Text style={styles.tabfont}>30天</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handlerBackBtnClick.bind(this,3) }
                                          style={[styles.listRowbg,this.state.tabindex==3?styles.active:'']}>
                            <Text style={styles.tabfont}>全部</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.bottomlist} onPress={this.tolist.bind(this,0,'waiting')}>
                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Image style={styles.icon} source={require('../../assets/home1.png')}
                            />
                            <Text style={styles.iconfont}>查询中</Text>
                        </View>

                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Text style={{marginRight:20,fontSize:20,marginTop:9}}>{this.state.waiting}</Text>
                            <Image style={styles.icon2} source={require('../../assets/right.png')}/>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.bottomlist} onPress={this.tolist.bind(this,3,'needChange')}>
                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Image style={styles.icon} source={require('../../assets/home3.png')}/>
                            <Text style={styles.iconfont}>信息需更新</Text>
                        </View>

                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Text style={{marginRight:20,fontSize:20,marginTop:9}}>{this.state.needChange}</Text>
                            <Image style={styles.icon2} source={require('../../assets/right.png')}/>
                        </View>

                    </TouchableOpacity>



                    <TouchableOpacity style={styles.bottomlist} onPress={this.tolist.bind(this,2,'noSales')}>
                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Image style={styles.icon} source={require('../../assets/home4.png')}/>
                            <Text style={styles.iconfont}>销货明细需补充</Text>
                        </View>

                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Text style={{marginRight:20,fontSize:20,marginTop:9}}>{this.state.noSales}</Text>
                            <Image style={styles.icon2} source={require('../../assets/right.png')}/>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.bottomlist} onPress={this.tolist.bind(this,1,'failed')}>
                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Image style={[styles.icon,{width:35,height:39}]} source={require('../../assets/home5.png')}/>
                            <Text style={styles.iconfont}>查询无结果</Text>
                        </View>

                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Text style={{marginRight:20,fontSize:20,marginTop:9}}>{this.state.failed}</Text>
                            <Image style={styles.icon2} source={require('../../assets/right.png')}/>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.bottomlist} onPress={this.tolist.bind(this,4,'noInvoice')}>
                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Image style={[styles.icon,{width:33,height:33}]} source={require('../../assets/home6.png')}/>
                            <Text style={styles.iconfont}>无法识别</Text>
                        </View>

                        <View style={{alignItems:'stretch',flexDirection:'row',}}>
                            <Text style={{marginRight:20,fontSize:20,marginTop:9}}>{this.state.noInvoice}</Text>
                            <Image style={styles.icon2} source={require('../../assets/right.png')}/>
                        </View>

                    </TouchableOpacity>

                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.refuesf.bind(this,1)}>
                        <Image style={[styles.icon,{width:54,height:44}]} source={require('../../assets/refuesf.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerimg} onPress={this.handlerphoneBtnClick.bind(this,1)}>
                        <Image style={[styles.icon,{width:71,height:55,marginLeft:15}]} source={require('../../assets/camera.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlerlistClick.bind(this,1)}>
                        <Image style={[styles.icon,{width:39,height:44}]} source={require('../../assets/home2.png')}/>
                    </TouchableOpacity>
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
    footerimg:{
      backgroundColor:'#fff',
        width:100,
        height:55,
        borderTopLeftRadius:55,
        borderTopRightRadius:55

    },
    footer:{
        marginTop:40,
        bottom:0,
        flex:0.2,
        flexDirection:'row',
        justifyContent:'space-around',
    },

    icon:{
        width:36,
        height:35,
        marginTop:7,
        marginRight:20,
        marginLeft:20
    },
    icon2:{
        width:13,
        height:22,
        marginRight:20,
        marginTop:13
    },
    iconfont:{
        lineHeight:35
    },
    bgimg:{
        backgroundColor:'rgb(213,226, 254)'
    },
    bottomlist:{
        backgroundColor:'#fff',
        alignItems:'stretch',
        flexDirection:'row',
        justifyContent:'space-between',
        height:50,
        marginTop:5
    },
    listRowbg:{
        backgroundColor:'#dae3f2',
        width:80,
        height:30,
        flex:1,
        alignItems: 'center',
        marginTop:5
    },
    tabfont:{
        lineHeight:25,
        color:'#fff'
    },
    active:{
        backgroundColor:'#4674c1',
    },
    overlay2: {
        position: 'absolute',
        top: 8,
        left: 8,
        flex:1,
        alignItems: 'center',
    },
    charsview:{
        position:'relative',
        flex:0.8,
        backgroundColor:'#fff',
        width:width-40,
        marginLeft:20,
        marginTop:20,
        marginBottom:10
    },
    percentage:{
        position:'absolute',
        left:95,
        top:99,
        fontSize:29
    },
    percentlist:{
        position:'absolute',
        right:20,
        top:50
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

    }
});