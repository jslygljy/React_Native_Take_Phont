import React,{
    Component,
    PropTypes
} from 'react';
import {Navigator} from 'react-native-deprecated-custom-components'

import Login from '../Login';
import ChangInfo from '../ChangInfo';
import List from '../List';
import Detail from '../Detail';
import Scan from '../Scan';
import Home from '../Home';

export default class MyProject extends React.Component {
    render() {
        var defaultName = 'Login';
        var defaultComponent = Login;
        return (
            <Navigator
                //指定了默认的页面，也就是启动app之后会看到的第一屏，需要两个参数，name跟component
                initialRoute={{ name: defaultName, component: defaultComponent }}
                configureScene={(route) => {
                    //跳转的动画
                    return Navigator.SceneConfigs.FadeAndroid;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    if(route.component){
                        return <Component
                            {...this.props}
                            {...route.params}
                            navigator={navigator}
                        />
                    }
                }} />
        );
    }

}
