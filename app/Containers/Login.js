'use strict';

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Text,
    Platform,
    BackAndroid,
    Image,
    TextInput,
    ToastAndroid,
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import {Images} from '../Themes';
import Register from './Register';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            password:'',
        };
        this._loginBtn = this._loginBtn.bind(this);
    }

    _pressButton() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.onBackAndroid()}}>
                        <Image
                            source={Images.returnArrow}
                            style={styles.backStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleBar}>登录</Text>

                    <Text style={styles.registBar} onPress={()=>{this._registBtn()}}>注册</Text>
                </View>
                <TextInput style={styles.phoneStyle}
                           onChangeText={(text) => this.setState({phone:text})}
                           value={this.state.phone}
                           autoFocus={true}
                           keyboardType={'numeric'}
                           placeholder={"输入手机号"}
                           placeholderTextColor={"#A6A6A6"}
                           underlineColorAndroid={'transparent'}
                />
                <View style={styles.dividerLine}/>
                <TextInput style={styles.passwordStyle}
                           onChangeText={(text) => this.setState({password:text})}
                           value={this.state.password}
                           keyboardType={'default'}
                           placeholder={"密码"}
                           placeholderTextColor={"#A6A6A6"}
                           underlineColorAndroid={'transparent'}
                           password={true}
                />
                <View style={styles.dividerLine}/>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this._loginBtn()}}>
                    <Text style={styles.loginBar}>确 定</Text>
                </TouchableOpacity>
                <View style={styles.dividerView}>
                    <View style={styles.dividerLeftLine}/>
                    <Text style={styles.dividerText}>或者使用微信登录</Text>
                    <View style={styles.dividerRightLine}/>
                </View>
                <Image
                    source={Images.weixinIcon}
                    style={styles.weixinStyle}
                />
            </View>
        );
    }

    _loginBtn(){
        if(this.state.phone.length==0 || this.state.password.length==0){
            ToastAndroid.show('账号或密码不能为空！！！', ToastAndroid.LONG);
            return;
        }
        if(this.state.phone=='13333333333'|| this.state.password == '123456'){
            this._pressButton();
        }else {
            ToastAndroid.show('账号或密码错误！！！', ToastAndroid.LONG);
        }
    }
    _registBtn() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
            })
        }
    };

    componentDidMount() {

    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为

    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems:'center',
    },
    titleView: {
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backStyle: {
        width: 25,
        height: 25,
        marginLeft: 10,
    },
    titleBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center'
    },
    registBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 17,
        textAlignVertical: 'center',
        width: 44,
        height: 44,
    },
    phoneStyle: {
        width:310,
        height: 43,
        padding: 0,
        marginTop:25,
        color: '#333333',
        textAlignVertical: 'center',
    },
    passwordStyle: {
        width:310,
        height: 43,
        padding: 0,
        color: '#333333',
        marginLeft:25,
        marginRight:25,
        marginTop:10,
        textAlignVertical: 'center',
    },
    dividerLine: {
        height: 1,
        width:310,
        backgroundColor: '#D9D9D9',
    },
    loginBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center',
        backgroundColor: '#41D9CC',
        height: 44,
        width: 310,
        marginTop: 30,
        borderRadius: 22,
    },
    dividerView: {
        marginTop: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dividerLeftLine:{
        height: 1,
        flex: 1,
        backgroundColor: '#D9D9D9',
        marginLeft:10,
        marginRight:5
    },
    dividerRightLine:{
        height: 1,
        flex: 1,
        backgroundColor: '#D9D9D9',
        marginLeft:5,
        marginRight:10
    },
    dividerText:{
        color: '#A6A6A6',
        textAlign: 'center',
        fontSize: 12,
        textAlignVertical: 'center',
    },
    weixinStyle:{
        width:70,
        height:70,
        marginTop:27,
    }
});


export default Home;