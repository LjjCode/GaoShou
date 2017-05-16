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
    ToastAndroid,
    WebView,
} from 'react-native';
import Dimensions from 'Dimensions';
var iWidth = Dimensions.get('window').width;
import Login from './Login';
import {Images} from '../Themes';
import InfoDetailData from '../Data/InfoDetailData.json';


class InfoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            collect: Images.unCollectIcon,
            isCollected: false,
        };
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
        let htmlTitle = "<h3 style=\"text-align:center;font-weight:bold;\">" + this.state.data.title + "</h3>\n" +
            "<h5 style=\"text-align: center;font-weight: normal;\">" + this.state.data.addTime + "</h5>\n" +
            "<hr width=\"96%\" size=\"1\" color=\"#000\">";
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.onBackAndroid()}}>
                        <Image
                            source={Images.returnArrow}
                            style={styles.backStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleBar}>资讯详情</Text>
                    <View style={styles.moreView}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{this._collect()}}>
                            <Image
                                source={this.state.collect}
                                style={styles.moreStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <WebView
                    style={{
                    backgroundColor: '#f7f7f7',
                    flex: 1,
                    }}
                    source={{html: htmlTitle+InfoDetailData.content}}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                />
            </View>
        );
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
        backgroundColor: '#F5FCFF',
    },
    titleView: {
        width: iWidth,
        height: 44,
        backgroundColor: '#41D9CC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    moreStyle: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
});


export default InfoDetail;