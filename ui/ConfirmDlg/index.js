import React,{
  Component,
  PropTypes
} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import Styles from './style';

export default class ConfirmDlg extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const {
      content,
      btnCancel,
      btnConfirm
    } = this.props;
    return (
      <View style={[Styles.container]}>
        <View style={[Styles.modalContainer]}>
          <View style={[Styles.body]}>
            <Text style={[Styles.contentStyle]}>{content}</Text>
          </View>
          <View style={[Styles.footer]}>
            <View style={[Styles.btnLeft]}>
              <TouchableOpacity style={[Styles.btn]} onPress={btnCancel.callback}>
                <Text style={[Styles.cancelBtn]}>{btnCancel.txt}</Text>
              </TouchableOpacity>
            </View>
            <View style={[Styles.btnRight]}>
              <TouchableOpacity style={[Styles.btn]} onPress={btnConfirm.callback}>
                <Text style={[Styles.confirmBtn]}>{btnConfirm.txt}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

ConfirmDlg.propTypes = {
  content: PropTypes.string,
  btnCancel: PropTypes.object,
  btnConfirm: PropTypes.object
};

ConfirmDlg.defaultProps = {
  btnCancel: {
    txt: '取消',
    callback: ()=>{console.log('取消')}
  },
  btnConfirm: {
    txt: '确定',
    callback: ()=>{console.log('确定')}
  }
}