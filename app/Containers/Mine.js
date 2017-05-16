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
    ScrollView,
    Button,
    Image
} from 'react-native';
import Register from './Register';
import Login from './Login';
import {Images} from '../Themes';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import recommendGsData from '../Data/recommendGsData.json';

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            data:recommendGsData[0],
        };
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

    _loginBtn() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Login',
                component: Login,
            })
        }
    };

    renderHeader() {
        if (this.state.isLogin) {
            return (
                <View style={styles.headerStyle}>
                        <Image
                            source={{uri: this.state.data.avatar}}
                            style={styles.avatarStyle}
                        />
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.name}>{this.state.data.nickName}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.school}>{this.state.data.masterS}</Text>
                            <Text style={styles.subject}>{this.state.data.masterSubject}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.dividerLine}/>
                        </View>
                        <View style={{width:iWidth,justifyContent:'center',alignItems:'center',flex:1,}}>
                            <Text style={styles.des} numberOfLines={2}>{this.state.data.adept}</Text>
                        </View>
                </View>
            );
        } else {
            return (
                <View style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>Hi~欢迎来到考研高手</Text>
                    <View style={styles.buttonViewStyle}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                            <Text style={styles.registStyle}>注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._loginBtn()}}>
                            <Text style={styles.loginStyle}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

    }

    render() {
        return (
            <ScrollView style={styles.scrollStyle}>
                {this.renderHeader()}
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                    <View style={styles.itemStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.mineCollectGs}
                        />
                        <Text style={styles.itemTextStyle}>收藏的高手</Text>
                        <View style={styles.itemViewStyle}>
                            <Image
                                style={styles.imageSetStyle}
                                source={Images.mineEnter}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                    <View style={styles.itemOtherStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.mineCollectInfo}
                        />
                        <Text style={styles.itemTextStyle}>收藏的资讯</Text>
                        <View style={styles.itemViewStyle}>
                            <Image
                                style={styles.imageSetStyle}
                                source={Images.mineEnter}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                    <View style={styles.itemOtherStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.mineCollectExam}
                        />
                        <Text style={styles.itemTextStyle}>收藏的考点</Text>
                        <View style={styles.itemViewStyle}>
                            <Image
                                style={styles.imageSetStyle}
                                source={Images.mineEnter}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                    <View style={styles.itemStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.mineSuggestion}
                        />
                        <Text style={styles.itemTextStyle}>意见反馈</Text>
                        <View style={styles.itemViewStyle}>
                            <Image
                                style={styles.imageSetStyle}
                                source={Images.mineEnter}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                    <View style={styles.itemOtherStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.mineIntroduction}
                        />
                        <Text style={styles.itemTextStyle}>使用说明</Text>
                        <View style={styles.itemViewStyle}>
                            <Image
                                style={styles.imageSetStyle}
                                source={Images.mineEnter}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._registBtn()}}>
                    <View style={styles.itemOtherStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={Images.mineSet}
                        />
                        <Text style={styles.itemTextStyle}>设置</Text>
                        <View style={styles.itemViewStyle}>
                            <Image
                                style={styles.imageSetStyle}
                                source={Images.mineEnter}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        backgroundColor: '#F7F7F7'
    },
    headerStyle: {
        backgroundColor: '#41D9CC',
        height: 210,
        width: iWidth,
        alignItems: 'center',
    },
    headerTextStyle: {
        fontSize: 15,
        color: '#ffffff',
        marginTop: 64,
    },
    registStyle: {
        backgroundColor: '#41D9CC',
        color: '#ffffff',
        fontSize: 15,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 16,
        width: 90,
        height: 32,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    loginStyle: {
        backgroundColor: '#ffffff',
        color: '#41D9CC',
        borderRadius: 16,
        fontSize: 15,
        width: 90,
        height: 32,
        marginLeft: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    buttonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    itemStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 44,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemOtherStyle: {
        backgroundColor: 'white',
        width: iWidth,
        height: 44,
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemViewStyle: {
        backgroundColor: 'white',
        flex: 1,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imageStyle: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
    imageSetStyle: {
        width: 20,
        height: 20,
        marginRight: 15,
    },
    itemTextStyle: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 15,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    avatarStyle: {
        width: 60,
        height: 60,
        marginTop: 44,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
    },
    name: {
        fontSize: 17,
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginTop: 10,
    },
    school: {
        fontSize: 14,
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginTop: 10,
    },

    subject: {
        fontSize: 14,
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#80F4F4F4',
        marginTop: 10,
    },
    des: {

        fontSize: 12,
        color: '#ffffff',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign:'center'
    },
});


export default Mine;