import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ListView,
  Animated,
  Easing,
  RefreshControl
} from 'react-native'
import styles from './styles'

function noop() {}

/**
 * TODO
 * 目前动画有问题，在退出页面后动画并没有被结束，
 * 导致再次进入页面时InteractionManager.runAfterInteractions 没有执行
 */
export default class ListView2 extends Component {
  constructor (props) {
    super(props)
    this.rotateValue = new Animated.Value(0)
  }

  static defaultProps = {
    footerStatus: 'loading'
  }

  componentWillUnmount () {
    // this.stopAnimated()
  }

  startAnimated () {
    this.rotateValue.setValue(0);
    Animated.timing(this.rotateValue,{
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start((o) => {
        this.startAnimated()
    });// 开始spring动画
  }

  stopAnimated () {
    this.rotateValue.stopAnimation(() => {console.log('stopAnimation')});// 开始spring动画
  }

  _renderFooter () {
    const { footerStatus, showFooter } = this.props
    if (!showFooter) {
      return null;
    }
    // const spin = this.rotateValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // })
    // <View style={styles.loadingBox}>
    //   <Animated.Image
    //     source={require('./imgs/spinner.png')}
    //     style={[styles.loadingIcon, {transform: [{rotate: spin}]}]}>
    //   </Animated.Image>
    //   <Image source={require('./imgs/yh.png') } style={styles.yhlogo}/>
    // </View>
    if (footerStatus === 'loading') {
      return (
        <View style={styles.footer}>
          <Text style={styles.text}>加载中...</Text>
        </View>
      )
    }/* else if (footerStatus === 'loaded') {
      return (
        <View style={styles.footer}>
          <Text style={styles.text}>加载完成</Text>
        </View>
      )
    }*/else if (footerStatus === 'end'){
      return (
        <View style={styles.footer}>
          <Text style={styles.text}>已到底</Text>
        </View>
      )
    } else {
      return null
    }
  }

  scrollTo (params) {
    this.listView.scrollTo(params)
  }

  render () {
    return (
      <ListView
       ref={(listView) => {
         this.listView = listView
       }}
        {...this.props}
        renderFooter={this._renderFooter.bind(this)}
      />
    )
  }
}
