/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
    Image,
    Button,
    Alert,
    TouchableOpacity,
    Navitagor,
    AsyncStorage
} from 'react-native';

import Dimensions from 'Dimensions';
import Main from './Main';
import Guide from './Guide';
import {Images} from '../Themes';


var iWidth = Dimensions.get('window').width;
var iHeight = Dimensions.get('window').height;

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    _onEnterHome() {
        setTimeout(() => {
            // 页面的切换
            const {
                navigator
            } = this.props;
            if (navigator) {
                navigator.push({
                    name: 'Main',
                    component: Main,
                })
            }
            ;
        }, 500);

    };

    _onEnterGuide() {
        const {
            navigator
        } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Guide',
                component: Guide,
            })
        }
        ;

    };

    render() {
        return (
            <View style={styles.pageStyle}>
                <Image
                    style={styles.imageStyle}
                    source={Images.index}
                />
            </View>
        );
    }

    componentDidMount() {
        AsyncStorage.getItem('FirstLogin')
            .then((value) => {
                if (value !== null) {
                    this._onEnterHome();
                } else {
                    this._onEnterGuide();
                }
            })
            .catch()
            .done();
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    pageStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: iWidth,
        height: iHeight,
    },
    buttonStyle: {
        color: 'white',
        fontSize: 15,
        backgroundColor: '#41D9CC',
    },
    buttonViewStyle: {
        width: iWidth * 0.4,
        height: 36,
        marginLeft: iWidth * 0.3,
        borderRadius: 18,
        backgroundColor: '#41D9CC',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});