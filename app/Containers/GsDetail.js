'use strict';

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    ListView,
    TouchableOpacity,
    Navigator,
    Text,
    Platform,
    BackAndroid,
    ToastAndroid,
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
var iHeight = Dimensions.get('window').height;
import {Images} from '../Themes';
import gsGoodsData from '../Data/gsGoodsData.json';

class GsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            collect: Images.unCollectIcon,
            isCollected: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(gsGoodsData),
        };
        this._collect = this._collect.bind(this);
    }

    _pressButton() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _collect() {
        if (this.state.isCollected) {
            this.setState({collect: Images.unCollectIcon});
            this.setState({isCollected: false});
            ToastAndroid.show('取消收藏', ToastAndroid.SHORT);
        } else {
            this.setState({collect: Images.collectIcon});
            this.setState({isCollected: true});
            ToastAndroid.show('收藏成功', ToastAndroid.SHORT);
        }

    }

    render() {
        return (
            <View style={{backgroundColor:'#F7F7F7',height:iHeight}}>
                <View style={styles.titleView}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.onBackAndroid()}}>
                        <Image
                            source={Images.returnArrow}
                            style={styles.backStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleBar}>高手详情</Text>
                    <View style={styles.moreView}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._collect()}}>
                            <Image
                                source={this.state.collect}
                                style={styles.moreStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._pressButton()}}>
                            <Image
                                source={Images.moreIcon}
                                style={styles.moreStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:75}}>
                    <View style={styles.gsDetailView}>
                        <Text style={styles.num}>{this.state.data.chatNum}人约过</Text>
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={{uri: this.state.data.avatar}}
                                style={styles.avatarStyle}
                            />
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={styles.name}>{this.state.data.nickName}</Text>
                                <Text style={styles.role}>高手</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={styles.school}>{this.state.data.masterS}</Text>
                                <Text style={styles.subject}>{this.state.data.masterSubject}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={styles.adept}>擅长</Text>
                                <Text style={styles.dividerLine}/>
                            </View>
                            <View style={{width:iWidth}}>
                                <Text style={styles.adeptText} numberOfLines={2}>{this.state.data.adept}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={styles.adept}>个人介绍</Text>
                                <Text style={styles.dividerLine}/>
                            </View>
                            <View style={{width:iWidth}}>
                                <Text style={styles.adeptText} numberOfLines={2}>{this.state.data.description}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{width:iWidth}}>
                        <Text style={styles.dividerText}>提供服务</Text>
                    </View>
                    <ListView style={{paddingHorizontal:10}}
                              dataSource={this.state.dataSource}
                              renderRow={this.renderData}
                    />
                </ScrollView>
                <TouchableOpacity style={styles.chatView} activeOpacity={0.5} onPress={()=>{}}>
                <Text style={styles.chatBar}>约 聊</Text>
            </TouchableOpacity>
            </View>
        );
    }

    renderData(data) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{}}>
                <View style={styles.listItemStyle}>
                    <Text style={styles.goodTitle}>{data.title}</Text>
                    <Text style={styles.goodPrice}>¥{data.goodPrice}.00</Text>
                    <Text style={styles.des} numberOfLines={2}>{data.description}</Text>
                </View>
            </TouchableOpacity>
        );
    }

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
        textAlignVertical: 'center',
        marginLeft: 35
    },
    chatBar: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center',
        backgroundColor: '#41D9CC',
    },
    chatView: {
        backgroundColor: '#41D9CC',
        width: iWidth,
        height: 50,
        position: 'absolute',
        bottom: 25,
        alignItems:'center',
        justifyContent:'center'
    },
    moreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    moreStyle: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    gsDetailView: {
        width: iWidth,
        height: 270,
        backgroundColor: '#41D9CC'
    },
    dividerText: {
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 10,
        textAlignVertical: 'center',
        fontSize: 15,
        color: '#333333'
    },
    goodTitle: {
        marginLeft: 10,
        marginVertical: 10,
        textAlignVertical: 'center',
        fontSize: 15,
        color: '#333333'
    },
    goodPrice: {
        marginLeft: 10,
        marginBottom: 10,
        textAlignVertical: 'center',
        fontSize: 17,
        color: 'red'
    },
    listItemStyle: {
        backgroundColor: 'white',
        flex: 1,
        height: 110,
        marginBottom: 10,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
    },
    des: {
        fontSize: 12,
        color: '#808080',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    num: {
        fontSize: 12,
        backgroundColor: '#41D9CC',
        color: '#ffffff',
        borderColor: '#80ffffff',
        borderWidth: 1,
        borderRadius: 8,
        width: 70,
        height: 16,
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    avatarStyle: {
        width: 60,
        height: 60,
        marginTop: -6,
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
    role: {
        fontSize: 14,
        backgroundColor: '#ffffff',
        color: '#41D9CC',
        borderColor: '#41D9CC',
        borderRadius: 9,
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center',
        width: 40,
        height: 18
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
        backgroundColor: '#80ffffff',
        marginTop: 10,
    },
    adept: {
        fontSize: 12,
        backgroundColor: '#41D9CC',
        color: '#ffffff',
        borderColor: '#80ffffff',
        borderWidth: 1,
        borderRadius: 8,
        width: 70,
        height: 16,
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center',
    },
    adeptText: {
        fontSize: 12,
        color: 'white',
        textAlignVertical: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },


});


export default GsDetail;